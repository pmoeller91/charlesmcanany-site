import allPhotoMetadataJson from "@/.json/photoMetadata.json";
import { notFound } from "next/navigation";
import { CombinedPhotoData, PhotoGallery } from "@/src/types/PhotoMetadata";
import { PhotoAttribute } from "@/src/components/photos/PhotoAttribute";
import {
  DirectoryNotFoundError,
  getPhotoGalleryDirectory,
} from "@/src/lib/utils/getPhotoGalleryDirectory";
import { GallerySharedWrapper } from "@/src/components/photos/GallerySharedWrapper";
import { Metadata, ResolvingMetadata } from "next";
import { PhotoHero } from "@/src/components/photos/PhotoHero";
import { getPhotoGalleryPhotoPaths } from "@/src/lib/utils/getPhotoGalleryPhotoPaths";

const allPhotoMetadata =
  allPhotoMetadataJson as PhotoGallery<CombinedPhotoData>;

// Next.js special function - Used for static generation at build time
export async function generateStaticParams(): Promise<
  SinglePhotoPageProps["params"][]
> {
  // All possible photo paths
  const paths = getPhotoGalleryPhotoPaths(allPhotoMetadata);

  return paths.map((path) => ({
    path,
  }));
}

// Returns a photo based on a directory route and a photo slug
function getPhoto(directory: string[], slug: string): CombinedPhotoData {
  let gallery: typeof allPhotoMetadata;
  let encodedSlug = encodeURIComponent(slug);
  try {
    gallery = getPhotoGalleryDirectory(allPhotoMetadata, directory);
  } catch (e) {
    if (e instanceof DirectoryNotFoundError) {
      notFound();
    }
    throw e;
  }
  const photoMetadata = gallery.photos?.find(
    (photo) => photo.slug === encodedSlug,
  );
  if (!photoMetadata) {
    notFound();
  }
  return photoMetadata;
}

// Splits the path param into the directory and the photo slug. Last param is slug, the rest are directories.
function splitPath(path: string[]): { directory: string[]; slug: string } {
  const decodedPath = path.map(decodeURIComponent);
  const directory = decodedPath.slice(0, -1);
  const slug = decodedPath[path.length - 1];
  return { directory, slug };
}

interface SinglePhotoPageProps {
  params: {
    path: string[];
  };
}

// Next.js special function - supplies a dynamic title for each photo page based on the photo data
export async function generateMetadata(
  { params }: SinglePhotoPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { path } = params;
  const { directory, slug } = splitPath(path);
  const photoMetadata = getPhoto(directory, slug);
  const creationDate = photoMetadata.metadata.exifData.createDate;
  const title = `${photoMetadata.title ?? "Untitled"}${creationDate ? ` - ${creationDate}` : ""}`;
  return {
    title,
  };
}

function SinglePhotoPage({ params }: SinglePhotoPageProps) {
  const { path } = params;
  const { directory, slug } = splitPath(path);
  const photoMetadata = getPhoto(directory, slug);
  const { exifData } = photoMetadata.metadata;
  const attributes = (
    [
      ["Camera", exifData.model],
      ["Lens", exifData.lensId],
      ["Focal Length", exifData.focalLength],
      [
        "Exposure Time",
        exifData.exposureTime ? `${exifData.exposureTime}s` : undefined,
      ],
      ["F-Stop", exifData.fNumber ? `f${exifData.fNumber}` : undefined],
      ["ISO", exifData.iso?.toString()],
    ] as [string, string | undefined][]
  ).filter(([_key, value]) => !!value) as [string, string][];
  return (
    <GallerySharedWrapper directory={directory} slug={slug}>
      <PhotoHero photo={photoMetadata} />
      <div className="mt-4 p-4 border-2 rounded-sm bg-theme-light dark:bg-darkmode-theme-light">
        <div className="flex flex-row mb-2 indent-4 items-baseline">
          <h2 className="inline-block">{photoMetadata.title ?? "Untitled"}</h2>
          {photoMetadata.metadata.exifData.createDate && (
            <h3 className="inline-block">
              {photoMetadata.metadata.exifData.createDate}
            </h3>
          )}
        </div>
        {photoMetadata.description && (
          <p className="">{photoMetadata.description}</p>
        )}

        <hr className="my-4 border-t-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {attributes.map(
            ([attributeName, attributeValue]) =>
              attributeValue && (
                <PhotoAttribute
                  attributeName={attributeName}
                  attributeValue={attributeValue}
                  key={attributeName}
                />
              ),
          )}
          {attributes.length === 0 && (
            <PhotoAttribute
              attributeName="No information available"
              attributeValue=""
            />
          )}
        </div>
      </div>
    </GallerySharedWrapper>
  );
}

export default SinglePhotoPage;
