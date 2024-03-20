import { CombinedPhotoData, PhotoGallery } from "@/src/types/PhotoMetadata";

function recursiveGetPhotoGalleryPhotoPaths(
  gallery: PhotoGallery<CombinedPhotoData>,
  route: string[],
) {
  const { directories, photos } = gallery;
  const photoRoutes: string[][] = [];
  if (photos) {
    photos.forEach((photo) => {
      photoRoutes.push([...route, photo.slug]);
    });
  }
  if (!directories) {
    return photoRoutes;
  }
  const directoryNames: string[] = Object.keys(gallery.directories ?? {});
  const routes = directoryNames.map((directoryName) => [
    ...route,
    directoryName,
  ]);
  routes.forEach((route) => {
    const directoryName = route[route.length - 1];
    photoRoutes.push(
      ...recursiveGetPhotoGalleryPhotoPaths(directories[directoryName], route),
    );
  });
  return photoRoutes;
}

function getPhotoGalleryPhotoPaths(
  gallery: PhotoGallery<CombinedPhotoData>,
): string[][] {
  return recursiveGetPhotoGalleryPhotoPaths(gallery, []);
}

export { getPhotoGalleryPhotoPaths };
