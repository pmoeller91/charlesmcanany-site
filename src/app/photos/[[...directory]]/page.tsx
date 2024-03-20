import { PhotoTile } from "@/src/components/photos/PhotoTile";
import Link from "next/link";
import combinedPhotoMetadataJson from "@/.json/photoMetadata.json";
import { CombinedPhotoData, PhotoGallery } from "@/src/types/PhotoMetadata";
import {
  DirectoryNotFoundError,
  getPhotoGalleryDirectory,
} from "@/src/lib/utils/getPhotoGalleryDirectory";
import { notFound } from "next/navigation";
import { DirectoryTile } from "@/src/components/photos/DirectoryTile";
import { GallerySharedWrapper } from "@/src/components/photos/GallerySharedWrapper";
import { Metadata, ResolvingMetadata } from "next";
import { titleify } from "@/src/lib/utils/textConverter";
import { getPhotoGalleryThumbnail } from "@/src/lib/utils/getPhotoGalleryThumbnail";
import { getPhotoGalleryDirectories } from "@/src/lib/utils/getPhotoGalleryDirectories";

const combinedPhotoMetadata =
  combinedPhotoMetadataJson as PhotoGallery<CombinedPhotoData>;

const baseTitle = "Gallery";

// Next.js special function - Used for static generation at build time
export async function generateStaticParams() {
  // All possible sub-directories
  const directories: (string[] | undefined)[] = getPhotoGalleryDirectories(
    combinedPhotoMetadata,
  );

  // Add the root directory
  directories.unshift(undefined);

  return directories.map((directory) => ({
    directory,
  }));
}

interface PhotosPageProps {
  params: {
    directory?: string[];
  };
}

export async function generateMetadata(
  { params }: PhotosPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { directory } = params;
  if (!directory) {
    return { title: baseTitle };
  }
  return {
    title: `${titleify(decodeURIComponent(directory[directory.length - 1]))} | ${baseTitle}`,
  };
}

const PhotosPage = ({ params }: PhotosPageProps) => {
  const { directory } = params;
  const decodedDirectory = directory?.map((directorySegment) =>
    decodeURIComponent(directorySegment),
  );
  const directoryHref = decodedDirectory
    ? `${decodedDirectory.join("/")}/`
    : "";

  let gallery: typeof combinedPhotoMetadata;
  try {
    gallery = getPhotoGalleryDirectory(combinedPhotoMetadata, decodedDirectory);
  } catch (e) {
    if (e instanceof DirectoryNotFoundError) {
      notFound();
    }
    throw e;
  }

  const { photos, directories } = gallery;

  return (
    <GallerySharedWrapper directory={decodedDirectory ?? []}>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-2 gap-y-8">
        {directories &&
          Object.keys(directories).map((directoryName) => (
            <Link
              href={`/photos/${directoryHref}${directoryName}`}
              className="m-auto"
              key={directoryName}
            >
              <DirectoryTile
                directoryName={directoryName}
                thumbnail={getPhotoGalleryThumbnail(directories[directoryName])}
              />
            </Link>
          ))}
        {photos &&
          photos.map((photoData, i) => (
            <Link
              href={`/photo/${directoryHref}${photoData.slug}`}
              key={photoData.metadata.path + i}
              className="m-auto"
            >
              <PhotoTile
                src={photoData.metadata.path}
                width={photoData.metadata.width}
                height={photoData.metadata.height}
              />
            </Link>
          ))}
      </div>
    </GallerySharedWrapper>
  );
};

export default PhotosPage;
