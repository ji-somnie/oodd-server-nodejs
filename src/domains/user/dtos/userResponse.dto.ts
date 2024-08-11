export class UserResponseDto {
  //수정 필요

  id!: number;
  name!: string;
  email!: string;
  nickname!: string;
  phoneNumber!: string;
  profilePictureUrl!: string;
  bio!: string;
  status!: string;
  joinedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date | null;
}
