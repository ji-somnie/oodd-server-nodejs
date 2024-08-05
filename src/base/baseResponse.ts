export class BaseResponse<T = any> {
    isSuccess!: boolean;
    code!: number; //성공코드
    message!: string;
    result?: T;
  }