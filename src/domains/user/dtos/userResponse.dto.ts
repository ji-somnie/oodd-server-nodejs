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
  isFrined?: boolean; // 다른 사람 프로필 조회할 때 친구 여부 표시
  roomId?: number | null; // 요청으로 보내드리는 userId에 대한 채팅방 id
}