import express from "express";
import myDataBase from "./data-source";
import userRouter from "./domains/user/userRouter";  // userRouter의 경로에 맞게 수정

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// userRouter를 애플리케이션에 등록
app.use(userRouter);

// 데이터베이스 초기화 및 서버 시작
myDataBase.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Database initialization failed:", error);
});
