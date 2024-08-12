export class OotdResponseDto {
  posts!: BaseOotdResponseDto[];
}

export class BaseOotdResponseDto {
  postId!: number;
  userId!: number;
  likes!: number;
  photoUrls!: string[];
  content!: string;
  styletags!: string[];
}
