export class BaseResponse<T = any> {
<<<<<<< HEAD
    isSuccess!: boolean;
    code!: number; //성공코드
    message!: string;
    result?: T;
  }
=======
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
>>>>>>> c05bc42a369b72b6a94b034be6b95365e4508687
