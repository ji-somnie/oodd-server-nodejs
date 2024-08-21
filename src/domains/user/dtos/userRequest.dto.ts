export class UserRequestDto { 
  id!: number; 
  name!: string;
  email!: string;
  nickname!: string;
  phoneNumber!: string;
  profilePictureUrl!: string;
  bio!: string;
  }

export class UserInfoRequestDto {
  nickname ?: string;
  profilePictureUrl ?: string;
  bio ?: string;
}