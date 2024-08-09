<<<<<<< HEAD
// src/base/baseResponse.ts

export class BaseResponse {
  success: boolean;
  message: string;

  constructor(success: boolean, message: string) {
      this.success = success;
      this.message = message;
  }
}

export function createResponse(success: boolean, message: string): BaseResponse {
  return new BaseResponse(success, message);
}
=======
export class BaseResponse<T = any> {
  isSuccess!: boolean;
  code!: number; //성공코드
  message!: string;
  result?: T;

  constructor(isSuccess: boolean, code: number, message: string, result?: any) {
    this.isSuccess = isSuccess;
    this.code = code;
    this.message = message;
    this.result = result;
  }
}
>>>>>>> d68dec8cb7c57e3b78123b4acd1a29bf1277797a
