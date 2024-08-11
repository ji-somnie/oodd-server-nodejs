export class OotdResponseDto {
  postId!: number;
  userId!: number;
  photoUrl!: string;
  content!: string;
  hashtags?: string[];
  clothingInfo?: {
    brand: string;
    model: string;
    modelNumber: string;
    url: string;
  };
  likes!: number;
  comments?: {
    commentId: number;
    userId: number;
    text: string;
    timestamp: string;
  }[];
  }
  