export interface PhotoMetadata {
  path: string;
  width: number;
  height: number;
  exifData: {
    model: string | undefined;
    lensId: string | undefined;
    focalLength: string | undefined;
    exposureTime: string | undefined;
    fNumber: number | undefined;
    iso: number | undefined;
    createDate: string | undefined;
  };
}

export interface UserPhotoData {
  title?: string;
  path: string;
  description?: string;
}

export interface GeneratedPhotoData {
  slug: string;
}

export interface CombinedPhotoData extends UserPhotoData, GeneratedPhotoData {
  metadata: PhotoMetadata;
}
