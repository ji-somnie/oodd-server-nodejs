import { BaseEntity } from "../../../base/baseEntity";

export class UserResponseDto extends BaseEntity{
  name!: string;
  email!: string;
  nickname!: string;
  phoneNumber!: string;
  profilePictureUrl!: string;
  bio!: string;
  joinedAt!: Date;
}
