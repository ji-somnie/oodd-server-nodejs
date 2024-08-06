export const HTTP_OK = { status: 200, isSuccess: true, code: 2000, message: 'OK' };
export const HTTP_BAD_REQUEST = { status: 400, isSuccess: false, code: 4000, message: 'Bad Request' };
export const HTTP_INTERNAL_SERVER_ERROR = { status: 500, isSuccess: false, code: 5000, message: 'Internal Server Error' };
export const HTTP_NOT_FOUND = { status: 404, isSuccess: false, code: 4040, message: 'Not Found' };

//export const INVALID_USER = { code: 3000, message: 'INVALID USER', err_code: 'INVALID_USER' };

//이렇게 만들어두면
//res.status(500).json({message: HTTP_OK.message}) 이런식으로 사용 가능