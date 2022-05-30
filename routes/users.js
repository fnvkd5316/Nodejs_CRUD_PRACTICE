const express = require("express");
const User = require("../schemas/user.js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email, password}).exec();

    if (!user || password !== user.password) {
        return res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",            
        });
    }

    const token = jwt.sign({ userId: "등록됨" }, "customized-secret-key");    

    res.send({
        result: "success",
        token,
    });
});

router.post("/register", async (req, res) => {
    const { email, password, nickname} = req.body;

    const existUser = await User.find({ $or: [{email}, {nickname}], });

    if (existUser.length) {
        return res.status(400).send({
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',            
        });
    }

    const user = new User({email, password, nickname});
    user.save();

    res.status(200).send({});
});


module.exports = router;