import allPhotoMetadataJson from "@/.json/photoMetadata.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CombinedPhotoData } from "@/src/types/PhotoMetadata";
import { PhotoAttribute } from "@/src/components/photos/PhotoAttribute";

const allPhotoMetadata = allPhotoMetadataJson as Record<
  string,
  CombinedPhotoData
>;

interface SinglePhotoPageProps {
  params: {
    slug: string;
  };
}

function SinglePhotoPage({ params }: SinglePhotoPageProps) {
  const { slug } = params;
  const photoMetadata = allPhotoMetadata[slug];
  if (!photoMetadata) {
    notFound();
  }
  const { exifData } = photoMetadata.metadata;
  const attributes: [string, string | undefined][] = [
    ["Date", exifData.createDate],
    ["Camera", exifData.model],
    ["Lens", exifData.lensId],
    ["Focal Length", exifData.focalLength],
    [
      "Exposure Time",
      exifData.exposureTime ? `${exifData.exposureTime}s` : undefined,
    ],
    ["F-Stop", exifData.fNumber ? `f${exifData.fNumber}` : undefined],
    ["ISO", exifData.iso?.toString()],
  ];
  return (
    <div className="container">
      <Image
        src={photoMetadata.path}
        width={photoMetadata.metadata.width}
        height={photoMetadata.metadata.height}
        alt={photoMetadata.title ?? "Untitled"}
        className="m-auto"
      />
      <div className="mt-4 p-4 border-2 rounded-sm bg-theme-light dark:bg-darkmode-theme-light">
        <h2 className="indent-4 mb-2">{photoMetadata.title}</h2>
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
        </div>
      </div>
    </div>
  );
}

export default SinglePhotoPage;
