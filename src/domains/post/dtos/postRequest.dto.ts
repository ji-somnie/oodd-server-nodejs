export class PostRequestDto {
  photoUrls!: string[] | null;
  content!: string | null;
  styletags?: string[] | null;
  clothingInfo!: {
      imageUrl: string | null;
      brand: string | null;
      model: string | null;
      modelNumber: string | null;
      url: string | null;
  }[] | null;
  isRepresentative?: boolean;
}
