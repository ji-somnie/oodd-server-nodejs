export class BasePostDto {
  photoUrls?: string[] | null;
  content?: string | null;
  styletags?: string[] | null;
  clothingInfo?: {
      brand: string | null;
      model: string | null;
      modelNumber: string | null;
      url: string | null;
  }[] | null;
}
