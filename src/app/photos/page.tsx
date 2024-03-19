import { PhotoTile } from "@/src/components/photos/PhotoTile";
import { urlify } from "@/src/lib/utils/textConverter";
import Link from "next/link";
import combinedPhotoMetadataJson from "@/.json/photoMetadata.json";
import { CombinedPhotoData } from "@/src/types/PhotoMetadata";

const combinedPhotoMetadata = combinedPhotoMetadataJson as Record<
  string,
  CombinedPhotoData
>;

const PhotosPage = () => {
  const photos = Object.values(combinedPhotoMetadata);
  return (
    <div className="container">
      <h2 className="h3 mb-6">Photos Porfolio</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-2 gap-y-8">
        {[...photos, ...photos, ...photos, ...photos, ...photos, ...photos].map(
          (photoData, i) => (
            <Link
              href={`/photo/${photoData.slug}`}
              key={photoData.metadata.path + i}
              className="m-auto"
            >
              <PhotoTile
                src={photoData.metadata.path}
                width={photoData.metadata.width}
                height={photoData.metadata.height}
              />
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default PhotosPage;
