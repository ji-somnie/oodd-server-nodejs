"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.myDataBase = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.myDataBase = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DEV_DB_HOST ? process.env.DEV_DB_HOST : process.env.DB_HOST,
    port: 3306,
    username: process.env.DEV_DB_USER ? process.env.DEV_DB_USER : process.env.DB_USER,
    password: process.env.DEV_DB_PASSWORD ? process.env.DEV_DB_PASSWORD : process.env.DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE ? process.env.DEV_DB_DATABASE : process.env.DB_DATABASE, // 스키마 이름
    entities: [__dirname + '/entities/*Entity{.ts,.js}'], // 모델의 경로
    logging: true, // 정확히 어떤 sql 쿼리가 실행됐는지 로그 출력
    synchronize: false, // 현재 entity 와 실제 데이터베이스 상 모델을 동기화
});
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!exports.myDataBase.isInitialized) {
            yield exports.myDataBase.initialize();
            console.log('Data Source has been initialized!');
        }
        return exports.myDataBase;
    }
    catch (err) {
        console.error('Error during Data Source initialization:', err);
        return null;
    }
});
exports.initializeDatabase = initializeDatabase;
exports.default = exports.myDataBase;
