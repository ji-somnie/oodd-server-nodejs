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
