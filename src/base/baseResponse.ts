//src/base/baseResponse.ts
export class BaseResponse<T = any> {
  isSuccess!: boolean;
  code!: number;
  message!: string;
  result?: T;
}
