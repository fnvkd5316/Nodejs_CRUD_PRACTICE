const express = require("express"); //express 모듈 가져오기
const Connect_MongoDB = require("./schemas/connect_db.js"); // mongo db 연결, mongoose 사용
const User = require("./schemas/schema_user.js");
const usersRouter = require("./routes/users");
const foodsRouter = require("./routes/foods");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

Connect_MongoDB(); //DB 연결


app.use(express.static("static"));
app.use(express.json()); // json형태의 데이터를 parsing하여 사용할 수 있게 만듦.
app.use("/users", express.urlencoded({ extended: false }), [usersRouter]);
app.use("/foods", express.urlencoded({ extended: false }) , [foodsRouter]);

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌습니다.");
});
