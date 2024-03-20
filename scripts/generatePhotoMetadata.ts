import type { Tags } from "exiftool-vendored";
import type {
  PhotoMetadata,
  UserPhotoData,
  CombinedPhotoData,
  PhotoGallery,
} from "@/src/types/PhotoMetadata";
import { urlify } from "@/src/lib/utils/textConverter";
import { keyBy, mapValues, zip, zipObject } from "lodash";
import fsPromises from "fs/promises";
import path from "node:path";
import Sharp from "sharp";
import { exiftool } from "exiftool-vendored";
import unprocessedUserPhotoDataJson from "@/src/photos/photoData.json";

const unprocessedUserPhotoData =
  unprocessedUserPhotoDataJson as PhotoGallery<UserPhotoData>;

const outputJson = ".json/photoMetadata.json";

function getCreateDate(exifData: Tags) {
  const createDate =
    exifData.CreateDate ??
    exifData.CreationDate ??
    exifData.OriginalCreateDateTime ??
    exifData.DateTimeOriginal ??
    exifData.DateTime ??
    exifData.DateTimeDigitized ??
    exifData.SubSecCreateDate ??
    exifData.SubSecDateTimeOriginal;
  if (!createDate) {
    return undefined;
  }
  if (typeof createDate === "string") return createDate;
  else
    return `${createDate.year}-${createDate.month.toString().padStart(2, "0")}-${createDate.day.toString().padStart(2, "0")}`;
}

// Generates a unique slug for each photo, used for routing in the gallery. Effectively a web filename.
function getSlug(userData: UserPhotoData, metadata: PhotoMetadata) {
  if (userData.title) {
    return urlify(userData.title);
  }
  if (metadata.exifData.createDate) {
    return urlify(`Untitled - ${metadata.exifData.createDate}`);
  }
  return path.basename(encodeURIComponent(userData.path));
}

// For each photo, combines the user-provided photo information with the extracted photo metadata.
async function combinePhotoData(
  userPhotoData: UserPhotoData[] | undefined,
  photoMetadata: PhotoMetadata[] | undefined,
): Promise<CombinedPhotoData[] | undefined> {
  if (!userPhotoData || !photoMetadata) {
    return undefined;
  }

  const keyedUserPhotoData = keyBy(
    userPhotoData,
    (userPhotoDatum) => userPhotoDatum.path,
  );

  const combinedPhotoData: CombinedPhotoData[] = photoMetadata.map(
    (photoMetadatum) => ({
      ...keyedUserPhotoData[photoMetadatum.path],
      slug: getSlug(keyedUserPhotoData[photoMetadatum.path], photoMetadatum),
      metadata: photoMetadatum,
    }),
  );

  return combinedPhotoData;
}

// Uses sharp and exiftool-vendored to extract metadata from each photo file
async function getPhotoMetadata(
  userPhotoData: UserPhotoData[] | undefined,
): Promise<PhotoMetadata[] | undefined> {
  if (!userPhotoData) {
    return undefined;
  }

  const photoPaths = userPhotoData.map((userPhotoDatum) => userPhotoDatum.path);

  const metadataPromises: Promise<PhotoMetadata | undefined>[] = photoPaths.map(
    async (photoPath) => {
      const localPhotoPath = path.join("./public", photoPath);
      const serverPhotoPath = path.join(
        "/",
        path.relative("./public/", localPhotoPath),
      );
      try {
        await fsPromises.access(localPhotoPath, fsPromises.constants.R_OK);
      } catch (e) {
        console.error(
          `Failed to access photo at path: "${path.resolve(localPhotoPath)}". ${e instanceof Error ? e.toString() : "Unknown Error"}`,
        );
        return undefined;
      }
      const photo = await fsPromises.readFile(localPhotoPath);
      const sharpPhotoMetadata = await Sharp(photo).metadata();
      const photoExif = await exiftool.read(localPhotoPath);
      return {
        path: serverPhotoPath,
        width: sharpPhotoMetadata.width || 0,
        height: sharpPhotoMetadata.height || 0,
        exifData: {
          model: photoExif.Model,
          lensId: photoExif.LensID,
          focalLength: photoExif.FocalLength,
          exposureTime: photoExif.ExposureTime,
          fNumber: photoExif.FNumber,
          iso: photoExif.ISO,
          createDate: getCreateDate(photoExif),
        },
      };
    },
  );

  const metadata = (await Promise.all(metadataPromises)).filter(
    (metadata): metadata is PhotoMetadata => !!metadata,
  );
  const filteredMetadata = metadata.filter(({ height, width }) => {
    if (height <= 0 || height > 65535) {
      return false;
    }
    if (width <= 0 || width > 65535) {
      return false;
    }
    return true;
  });

  return filteredMetadata;
}

// A photo gallery has photos and directories. Begins with photos containing
// only the user-provided data for each photo. This function then recursively
// gathers metadata for each photo file and combines that with user data for
// every photo in each directory.
async function processGallery(gallery: PhotoGallery<UserPhotoData>): Promise<{
  processedGallery: PhotoGallery<CombinedPhotoData>;
  totalPhotos: number;
}> {
  const metadata = await getPhotoMetadata(gallery.photos);
  const combinedMetadata = await combinePhotoData(gallery.photos, metadata);
  const photosProcessed = combinedMetadata?.length ?? 0;

  if (!gallery.directories) {
    return {
      processedGallery: {
        photos: combinedMetadata,
      },
      totalPhotos: photosProcessed,
    };
  }

  const directoryKeys = Object.keys(gallery.directories);
  const processedGalleries = await Promise.all(
    Object.values(gallery.directories).map((directory) =>
      processGallery(directory),
    ),
  );

  const totalPhotos =
    processedGalleries.reduce(
      (sum, processedGallery) => sum + processedGallery.totalPhotos,
      0,
    ) + photosProcessed;

  const processedDirectories = zipObject(
    directoryKeys,
    processedGalleries.map(
      (processedGallery) => processedGallery.processedGallery,
    ),
  );
  return {
    processedGallery: {
      photos: combinedMetadata,
      directories: processedDirectories,
    },
    totalPhotos,
  };
}

(async () => {
  const { processedGallery, totalPhotos } = await processGallery(
    unprocessedUserPhotoData,
  );

  // Create JSON directory if it does not exist
  await fsPromises.mkdir(path.dirname(outputJson), { recursive: true });
  const jsonFile = await fsPromises.open(outputJson, "w");

  await jsonFile.writeFile(JSON.stringify(processedGallery, undefined, 4));

  console.log(`Successfully output JSON metadata for ${totalPhotos} photos.`);

  await exiftool.end();
})();
