export default class BaseResponse {
  static success(result: any) {
    return {
      success: true,
      result,
    };
  }

  static error(message: string, error: any = null) {
    return {
      success: false,
      message,
      error,
    };
  }
}
