export const HTTP_OK = { code: 2000, message: 'OK', err_code: 'HTTP_OK' };
export const HTTP_BAD_REQUEST = { code: 4000, message: 'Bad Request', err_code: 'HTTP_BAD_REQUEST' };
export const HTTP_UNAUTHORIZED = { code: 4001, message: 'Unauthorized', err_code: 'HTTP_UNAUTHORIZED' };
export const HTTP_NOT_FOUND = { code: 4004, message: 'Not Found', err_code: 'HTTP_NOT_FOUND' };
export const HTTP_INTERNAL_SERVER_ERROR = { code: 5000, message: 'Internal Server Error', err_code: 'HTTP_INTERNAL_SERVER_ERROR' };
export const INVALID_USER = { code: 3000, message: 'INVALID USER', err_code: 'INVALID_USER' };

//이렇게 만들어두면
//res.status(500).json({message: HTTP_OK.message}) 이런식으로 사용 가능