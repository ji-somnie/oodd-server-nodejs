import {StatusCodes} from 'http-status-codes';

export const status = {
  SUCCESS: {status: StatusCodes.OK, isSuccess: true, code: 200, message: 'success!'},

  // common err
  INTERNAL_SERVER_ERROR: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    isSuccess: false,
    code: 'COMMON001',
    message: '서버 에러, 관리자에게 문의 바랍니다.',
    err_code: 'HTTP_INTERNAL_SERVER_ERROR',
  },
  BAD_REQUEST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'COMMON002',
    message: '잘못된 요청입니다.',
    err_code: 'HTTP_BAD_REQUEST',
  },
  UNAUTHORIZED: {
    status: StatusCodes.UNAUTHORIZED,
    isSuccess: false,
    code: 'COMMON003',
    message: '권한이 잘못되었습니다.',
    err_code: 'HTTP_UNAUTHORIZED',
  },

  // user err
  USER_NOT_FOUND: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4001',
    message: '사용자가 없습니다.',
    err_code: 'USER_NOT_FOUND',
  },

  KAKAO_AUTH_FAIL: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4003',
    message: 'Kakao 사용자 인정 과정에서 오류가 발생했습니다',
    err_code: 'KAKAO_AUTH_FAIL',
  },
  KAKAO_TOKEN_FAIL: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4002',
    message: 'Error getting Kakao token',
    err_code: 'KAKAO_TOKEN_FAIL',
  },
  KAKAO_USER_NOT_FOUND: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4002',
    message: '카카오 계정의 정보를 불러오지 못했습니다.',
    err_code: 'KAKAO_USER_NOT_FOUND',
  },

  GOOGLE_AUTH_FAIL: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4003',
    message: 'Google 사용자 인정 과정에서 오류가 발생했습니다',
    err_code: 'GOOGLE_AUTH_FAIL',
  },
  GOOGLE_TOKEN_FAIL: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4004',
    message: 'Error getting Google token',
    err_code: 'GOOGLE_TOKEN_FAIL',
  },
  GOOGLE_USER_NOT_FOUND: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4005',
    message: '구글 계정의 정보를 불러오지 못했습니다.',
    err_code: 'GOOGLE_USER_NOT_FOUND',
  },

  NAVER_AUTH_FAIL: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4006',
    message: 'NAVER 사용자 인정 과정에서 오류가 발생했습니다',
    err_code: 'NAVER_AUTH_FAIL',
  },
  NAVER_TOKEN_FAIL: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4007',
    message: 'Error getting NAVER token',
    err_code: 'NAVER_TOKEN_FAIL',
  },
  NAVER_USER_NOT_FOUND: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4008',
    message: 'NAVER 계정의 정보를 불러오지 못했습니다.',
    err_code: 'NAVER_USER_NOT_FOUND',
  },

  // phone verification err
  PHONE_NUMBER_REQUIRED: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4011',
    message: 'Phone number is required',
    err_code: 'PHONE_NUMBER_REQUIRED',
  },
  VERIFICATION_SEND_SUCCESS: {
    status: StatusCodes.OK,
    isSuccess: true,
    code: 'USER4012',
    message: 'Verification code sent successfully',
    err_code: 'VERIFICATION_SEND_SUCCESS',
  },
  VERIFICATION_SEND_FAILED: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4013',
    message: 'Failed to send verification code',
    err_code: 'VERIFICATION_SEND_FAILED',
  },
  VERIFICATION_CODE_NEEDED: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4014',
    message: 'Phone number and token are required',
    err_code: 'VERIFICATION_CODE_NEEDED',
  },
  VERIFY_SUCCESS: {
    status: StatusCodes.OK,
    isSuccess: true,
    code: 'USER4015',
    message: 'Verification successful',
    err_code: 'VERIFY_SUCCESS',
  },
  VERIFY_FAILED: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 'USER4016',
    message: 'Failed to verify code',
    err_code: 'VERIFY_FAILED',
  },

  // post err
  ARTICLE_NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 'ARTICLE4001',
    message: '게시글이 없습니다.',
    err_code: 'ARTICLE_NOT_FOUND',
  },
};

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
export const NOT_FOUND_POST = {
  code: 3000,
  message: '존재하지 않는 게시글입니다.',
  err_code: 'NOT_FOUND_POST',
};

export const NO_PARAMETER = {code: 3001, message: '필수 파라미터가 누락되었습니다.', err_code: 'NO_PARAMETER'};
export const NO_BODY_DATA = {code: 3001, message: '데이터가 없습니다.', err_code: 'NO_BODY_DATA'};
export const NOT_MEMBER_IN_ROOM = {code: 3002, message: '채팅방에 없는 유저입니다.', err_code: 'NOT_MEMBER_IN_ROOM'};
export const ALREADY_LEAVED_ROOM = {code: 3003, message: '이미 나간 채팅방입니다.', err_code: 'ALREADY_LEAVED_ROOM'};
export const CANNOT_REQUEST_MYSELF = {
  code: 3004,
  message: '자신에게 요청할 수 없습니다.',
  err_code: 'CANNOT_REQUEST_MYSELF',
};
export const NOT_FOUND_USER_RELATIONSHIP = {
  code: 3005,
  message: '존재하지 않는 유저 관계입니다.',
  err_code: 'NOT_FOUND_USER_RELATIONSHIP',
};
export const NOT_PENDING_REQUEST = {code: 3006, message: '대기중인 요청이 아닙니다.', err_code: 'NOT_PENDING_REQUEST'};
export const ALREADY_REQUESTED = {code: 3007, message: '이미 요청한 관계입니다.', err_code: 'ALREADY_REQUESTED'};

export const NO_AUTHORIZATION = {code: 1000, message: '권한이 없습니다.', err_code: 'NO_AUTHORIZATION'};
export const INVALID_POST_ID = {code: 1001, message: '유효하지 않은 게시물 ID입니다.', err_code: 'INVALID_POST_ID'};
export const DATABASE_ERROR = {code: 1002, message: '데이터베이스 오류입니다.', err_code: 'DATABASE_ERROR'};

export const KAKAO_AUTH_FAIL = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4003',
  message: 'Kakao 사용자 인정 과정에서 오류가 발생했습니다',
  err_code: 'KAKAO_AUTH_FAIL',
};
export const KAKAO_TOKEN_FAIL = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4002',
  message: 'Error getting Kakao token',
  err_code: 'KAKAO_TOKEN_FAIL',
};
export const KAKAO_USER_NOT_FOUND = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4002',
  message: '카카오 계정의 정보를 불러오지 못했습니다.',
  err_code: 'KAKAO_USER_NOT_FOUND',
};

export const GOOGLE_AUTH_FAIL = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4003',
  message: 'Google 사용자 인정 과정에서 오류가 발생했습니다',
  err_code: 'GOOGLE_AUTH_FAIL',
};
export const GOOGLE_TOKEN_FAIL = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4004',
  message: 'Error getting Google token',
  err_code: 'GOOGLE_TOKEN_FAIL',
};
export const GOOGLE_USER_NOT_FOUND = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4005',
  message: '구글 계정의 정보를 불러오지 못했습니다.',
  err_code: 'GOOGLE_USER_NOT_FOUND',
};

export const NAVER_AUTH_FAIL = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4006',
  message: 'NAVER 사용자 인정 과정에서 오류가 발생했습니다',
  err_code: 'NAVER_AUTH_FAIL',
};
export const NAVER_TOKEN_FAIL = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4007',
  message: 'Error getting NAVER token',
  err_code: 'NAVER_TOKEN_FAIL',
};
export const NAVER_USER_NOT_FOUND = {
  status: StatusCodes.BAD_REQUEST,
  isSuccess: false,
  code: 'USER4008',
  message: 'NAVER 계정의 정보를 불러오지 못했습니다.',
  err_code: 'NAVER_USER_NOT_FOUND',
};

export const INVALID_CONTENT = {code: 1003, message: 'Invalid Content', err_code: 'INVALID_CONTENT'};
export const INVALID_COMMENT = {code: 1001, message: 'Invalid comment', err_code: 'INVALID_COMMENT'};
