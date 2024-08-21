export class BaseResponse<T = any> {
  isSuccess!: boolean;
  code!: number; // 성공 코드
  message!: string;
  result?: T;

  constructor(isSuccess: boolean, code: number, message: string, result?: T) {
    this.isSuccess = isSuccess;
    this.code = code;
    this.message = message;
    this.result = result;
  }

  // 성공 응답을 생성하는 정적 메서드
  static success<T>(result?: T, message: string = "Operation successful", code: number = 200): BaseResponse<T> {
    return new BaseResponse<T>(true, code, message, result);
  }

  // 실패 응답을 생성하는 정적 메서드
  static error(message: string, code: number = 400): BaseResponse<null> {
    return new BaseResponse<null>(false, code, message);
  }
}
