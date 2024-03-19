import type { Tags } from "exiftool-vendored";
import type {
  PhotoMetadata,
  UserPhotoData,
  CombinedPhotoData,
} from "@/src/types/PhotoMetadata";
import { urlify } from "@/src/lib/utils/textConverter";
import { keyBy } from "lodash";
import fsPromises from "fs/promises";
import path from "node:path";
import Sharp from "sharp";
import { exiftool } from "exiftool-vendored";
import userPhotoDataJson from "@/src/photos/photoData.json";

const userPhotoData = userPhotoDataJson as UserPhotoData[];

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

async function combinePhotoData(
  userPhotoData: UserPhotoData[],
  photoMetadata: PhotoMetadata[],
): Promise<Record<string, CombinedPhotoData>> {
  const keyedPhotoMetadata = keyBy(
    photoMetadata,
    (photoMetadatum) => photoMetadatum.path,
  );

  const combinedPhotoData: CombinedPhotoData[] = userPhotoData.map(
    (userPhotoDatum) => ({
      ...userPhotoDatum,
      slug: userPhotoDatum.title
        ? urlify(userPhotoDatum.title)
        : urlify(userPhotoDatum.path),
      metadata: keyedPhotoMetadata[userPhotoDatum.path],
    }),
  );

  return keyBy(
    combinedPhotoData,
    (combinedPhotoDatum) => combinedPhotoDatum.slug,
  );
}

(async () => {
  const photos = userPhotoData.map((userPhotoDatum) => userPhotoDatum.path);

  const metadataPromises: Promise<PhotoMetadata>[] = photos.map(
    async (photoName) => {
      const absolutePhotoPath = path.join("./public", photoName);
      const photoPath = path.join(
        "/",
        path.relative("./public/", absolutePhotoPath),
      );
      const photo = await fsPromises.readFile(absolutePhotoPath);
      const sharpPhotoMetadata = await Sharp(photo).metadata();
      const photoExif = await exiftool.read(absolutePhotoPath);
      return {
        path: photoPath,
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

  const metadata = await Promise.all(metadataPromises);
  const filteredMetadata = metadata.filter(({ height, width }) => {
    if (height <= 0 || height > 65535) {
      return false;
    }
    if (width <= 0 || width > 65535) {
      return false;
    }
    return true;
  });

  const combinedPhotoData = await combinePhotoData(
    userPhotoData,
    filteredMetadata,
  );

  // Create JSON directory if it does not exist
  await fsPromises.mkdir(path.dirname(outputJson), { recursive: true });
  const jsonFile = await fsPromises.open(outputJson, "w");

  await jsonFile.writeFile(JSON.stringify(combinedPhotoData, undefined, 4));

  console.log(
    `Successfully output JSON metadata for ${Object.keys(combinedPhotoData).length} photos.`,
  );

  await exiftool.end();
})();
