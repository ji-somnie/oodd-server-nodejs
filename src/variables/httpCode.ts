import { StatusCodes } from "http-status-codes";

export const status = {
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 2000, "message": "success!"},    
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 5000, "message": "서버 에러, 관리자에게 문의 바랍니다.", err_code: 'HTTP_INTERNAL_SERVER_ERROR' },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 4000, "message": "잘못된 요청입니다.", err_code: 'HTTP_BAD_REQUEST' },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": 4001, "message": "권한이 잘못되었습니다.", err_code: 'HTTP_UNAUTHORIZED'},
}

