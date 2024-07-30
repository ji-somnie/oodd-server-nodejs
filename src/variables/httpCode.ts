import { StatusCodes } from "http-status-codes";

export const status = {
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},    

    // common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON001", "message": "서버 에러, 관리자에게 문의 바랍니다.", err_code: 'HTTP_INTERNAL_SERVER_ERROR' },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMON002", "message": "잘못된 요청입니다.", err_code: 'HTTP_BAD_REQUEST' },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMON003", "message": "권한이 잘못되었습니다.", err_code: 'HTTP_UNAUTHORIZED'},

    // user err
    USER_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4001", "message": "사용자가 없습니다."},

    // post err
    ARTICLE_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "ARTICLE4001", "message": "게시글이 없습니다."}
}

