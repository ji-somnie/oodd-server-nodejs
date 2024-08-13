export class PostRequestDto {
  photoUrl!: string;
  caption!: string;
  hashtags!: string[];
  clothingInfo!: {
    brand: string;
    model: string;
    modelNumber: string;
    url: string;
  };
}