import { CombinedPhotoData, PhotoGallery } from "@/src/types/PhotoMetadata";

// Simple depth-first search to find a photo to use as a thumbnail
function getPhotoGalleryThumbnail(
  gallery: PhotoGallery<CombinedPhotoData>,
): CombinedPhotoData | undefined {
  if (gallery.photos) {
    return gallery.photos[0];
  }
  const directories = gallery.directories;
  if (!directories) {
    return undefined;
  }
  for (let directory in directories) {
    const thumbnail = getPhotoGalleryThumbnail(directories[directory]);
    if (thumbnail) {
      return thumbnail;
    }
  }
  return undefined;
}

export { getPhotoGalleryThumbnail };
