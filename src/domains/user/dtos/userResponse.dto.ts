import { BaseEntity } from "../../../base/baseEntity";
import { UserRequestDto } from "./userRequest.dto";

export class UserResponseDto extends BaseEntity{
  name!: string;
  email!: string;
  nickname!: string;
  phoneNumber!: string;
  profilePictureUrl!: string;
  bio!: string;
  joinedAt!: Date;
}

export class UserInfoResponseDto extends UserRequestDto{
  joinedAt !: Date;
}