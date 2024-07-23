"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataBase = void 0;
const typeorm_1 = require("typeorm");
//import { User } from "./user/user.entity";
exports.myDataBase = new typeorm_1.DataSource({
    type: "mysql",
    host: "oodd-dev-db.c1uwgkkcu9oj.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    username: "root",
    password: "oodd2024!",
    database: "oodd-dev-db", // db 이름
    entities: ["src/entity/*.ts"], // 모델의 경로
    logging: true, // 정확히 어떤 sql 쿼리가 실행됐는지 로그 출력
    synchronize: true, // 현재 entity 와 실제 데이터베이스 상 모델을 동기화
});
// myDataBase.initialize()
//   .then(() => {
//     console.log("Data Source initialized");
//   })
//   .catch((err) => {
//     console.error("Error during initialization:", err);
//   });
