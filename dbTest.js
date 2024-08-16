const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'oodd-dev-db.c1uwgkkcu9oj.ap-northeast-2.rds.amazonaws.com',
  user: 'root',
  password: 'oodd2024',
  database: 'oodd_dev',
  connectTimeout: 20000 // 타임아웃 설정 (밀리초)
});

db.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패: ', err);
    return;
  }
  console.log('데이터베이스 연결 성공');
});
