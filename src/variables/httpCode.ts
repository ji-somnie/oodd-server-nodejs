<<<<<<< HEAD
const HttpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export default HttpCode;
=======
export const HTTP_OK = {code: 2000, message: 'OK'};
export const HTTP_BAD_REQUEST = {code: 4000, message: 'Bad Request'};
export const HTTP_INTERNAL_SERVER_ERROR = {code: 5000, message: 'Internal Server Error'};
export const HTTP_NOT_FOUND = {code: 4040, message: 'Not Found'};
export const NOT_FOUND_USER = {code: 3000, message: '존재하지 않는 유저입니다.', err_code: 'NOT_FOUNT_USER'};
export const NOT_FOUND_CHAT_ROOM = {
  code: 3000,
  message: '존재하지 않는 채팅방입니다.',
  err_code: 'NOT_FOUND_CHAT_ROOM',
};
export const NO_PARAMETER = {code: 3001, message: '필수 파라미터가 누락되었습니다.', err_code: 'NO_PARAMETER'};
export const NOT_MEMBER_IN_ROOM = {code: 3002, message: '채팅방에 없는 유저입니다.', err_code: 'NOT_MEMBER_IN_ROOM'};
export const ALREADY_LEAVED_ROOM = {code: 3003, message: '이미 나간 채팅방입니다.', err_code: 'ALREADY_LEAVED_ROOM'};
>>>>>>> d68dec8cb7c57e3b78123b4acd1a29bf1277797a
