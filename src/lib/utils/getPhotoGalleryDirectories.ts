import { CombinedPhotoData, PhotoGallery } from "@/src/types/PhotoMetadata";

function recursiveGetPhotoGalleryDirectories<T>(
  gallery: PhotoGallery<T>,
  route: string[],
): string[][] {
  const { directories } = gallery;
  if (!directories) {
    return [];
  }
  const directoryNames: string[] = Object.keys(gallery.directories ?? {});
  const routes = directoryNames.map((directoryName) => [
    ...route,
    directoryName,
  ]);
  routes.forEach((route) => {
    const directoryName = route[route.length - 1];
    routes.push(
      ...recursiveGetPhotoGalleryDirectories(directories[directoryName], route),
    );
  });
  return routes;
}

function getPhotoGalleryDirectories<T>(gallery: PhotoGallery<T>): string[][] {
  return recursiveGetPhotoGalleryDirectories(gallery, []);
}

export { getPhotoGalleryDirectories };
