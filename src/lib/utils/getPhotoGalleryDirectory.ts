import { PhotoGallery } from "@/src/types/PhotoMetadata";

class DirectoryNotFoundError extends RangeError {
  constructor(message: string) {
    super(message);
    this.name = "DirectoryNotFoundError";
  }
}

function recursiveGetPhotoGalleryDirectory<T>(
  currentGallery: PhotoGallery<T>,
  directory: string[],
  partialDirectory = directory,
) {
  if (partialDirectory.length === 0) {
    return currentGallery;
  }
  const nextDirectorySegment = partialDirectory[0];
  const remainingDirectory = partialDirectory.slice(1);
  if (!currentGallery.directories?.[nextDirectorySegment]) {
    throw new DirectoryNotFoundError(
      `Invalid directory: '${directory.join("/")}'`,
    );
  }
  return recursiveGetPhotoGalleryDirectory(
    currentGallery.directories[nextDirectorySegment],
    directory,
    remainingDirectory,
  );
}

function getPhotoGalleryDirectory<T>(
  gallery: PhotoGallery<T>,
  directory: string[] = [],
): PhotoGallery<T> {
  return recursiveGetPhotoGalleryDirectory(gallery, directory);
}

export { getPhotoGalleryDirectory, DirectoryNotFoundError };
