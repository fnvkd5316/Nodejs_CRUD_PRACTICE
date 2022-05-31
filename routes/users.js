const express = require("express");
const User = require("../schemas/schema_user.js");
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

    const token = jwt.sign({ userId: user.userId }, "test");    

    res.send({
        result: "success",
        token,
    });
});

router.post("/register", async (req, res) => {
    const { email, password, nickname} = req.body;

    if (!(email && password && nickname)) {
        return res.status(400).send({
            errorMessage: '모든 항목을 기입해야 합니다.',            
        });
    }

    const olduser = await User.find({ $or: [{email}, {nickname}], });

    if (olduser.length) {
        return res.status(400).send({
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',            
        });
    }

    const user = new User({email, password, nickname});
    user.save();

    res.status(200).send({});
});


module.exports = router;