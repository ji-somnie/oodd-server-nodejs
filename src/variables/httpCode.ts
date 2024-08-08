import { StatusCodes } from "http-status-codes";

export const status = {
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},    

    // common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON001", "message": "서버 에러, 관리자에게 문의 바랍니다.", err_code: 'HTTP_INTERNAL_SERVER_ERROR' },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMON002", "message": "잘못된 요청입니다.", err_code: 'HTTP_BAD_REQUEST' },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMON003", "message": "권한이 잘못되었습니다.", err_code: 'HTTP_UNAUTHORIZED'},

    // user err
    USER_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4001", "message": "사용자가 없습니다.", err_code: 'USER_NOT_FOUND'},
    
    KAKAO_AUTH_FAIL : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4002", "message": "Kakao 사용자 인정 과정에서 오류가 발생했습니다", err_code: 'KAKAO_AUTH_FAIL'},
    KAKAO_TOKEN_FAIL: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4003", "message": "Error getting Kakao token", err_code: 'KAKAO_TOKEN_FAIL'},
    KAKAO_USER_NOT_FOUND : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4004", "message": "카카오 계정의 정보를 불러오지 못했습니다.", err_code: 'KAKAO_USER_NOT_FOUND'},
    
    GOOGLE_AUTH_FAIL : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4005", "message": "Google 사용자 인정 과정에서 오류가 발생했습니다", err_code: 'GOOGLE_AUTH_FAIL'},
    GOOGLE_TOKEN_FAIL : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4006", "message": "Error getting Google token", err_code: 'GOOGLE_TOKEN_FAIL'},
    GOOGLE_USER_NOT_FOUND : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4007", "message": "구글 계정의 정보를 불러오지 못했습니다.", err_code: 'GOOGLE_USER_NOT_FOUND'},

    NAVER_AUTH_FAIL : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4008", "message": "NAVER 사용자 인정 과정에서 오류가 발생했습니다", err_code: 'NAVER_AUTH_FAIL'},
    NAVER_TOKEN_FAIL : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4009", "message": "Error getting NAVER token", err_code: 'NAVER_TOKEN_FAIL'},
    NAVER_USER_NOT_FOUND : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER40010", "message": "NAVER 계정의 정보를 불러오지 못했습니다.", err_code: 'NAVER_USER_NOT_FOUND'},

    PHONE_NUMBER_REQUIRED : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4011", "message": "Phone number is required", err_code: 'PHONE_NUMBER_REQUIRED'},
    VERIFICATION_SEND_SUCCESS : {status: StatusCodes.OK, "isSuccess": true, "code": "USER4012", "message": "Verification code sent successfully", err_code: 'VERIFICATION_SEND_SUCCESS'},
    VERIFICATION_SEND_FAILED : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4013", "message": "Failed to send verification code", err_code: 'VERIFICATION_SEND_FAILED'},
    VERIFICATION_CODE_NEEDED : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4014", "message": "Phone number and token are required", err_code: 'VERIFICATION_CODE_NEEDED'},
    VERIFY_SUCCESS : {status: StatusCodes.OK, "isSuccess": true, "code": "USER4015", "message": "Verification successful", err_code: 'VERIFY_SUCCESS'},
    VERIFY_FAILED : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4016", "message": "Failed to verify code", err_code: 'VERIFY_FAILED'},

    // post err
    ARTICLE_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "ARTICLE4001", "message": "게시글이 없습니다.", err_code: 'ARTICLE_NOT_FOUND'}
}

