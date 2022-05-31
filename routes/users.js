const express = require("express");
const User = require("../schemas/schema_user.js");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Joi = require('joi');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email, password}).exec();

    if (!user || password !== user.password) {
        return res.status(400).send({
            errorMessage: "아이디 또는 패스워드가 잘못됐습니다.",            
        });
    }

    const token = jwt.sign({ userId: user.userId }, "test");    

    res.send({
        result: "success",
        token,
    });
});

const postUsersSchema = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().alphanum().min(3).required(),
    password: Joi.string().alphanum().min(4).required(),
    password2: Joi.string().alphanum().min(4).required(),
});

router.post("/register", async (req, res) => {
    try {
        var {
            nickname,
            email,
            password,
            password2,
        } = await postUsersSchema.validateAsync(req.body);
    }catch(err) {
        return res.status(400).send({
            errorMessage: '입력조건이 맞지 않습니다.'
        })
    };

    if (!(email && password && password2 && nickname)) {
        return res.status(400).send({
            errorMessage: '모든 항목을 기입해야 합니다.',            
        });
    }

    if ( String(password).includes(String(email)) === true ){
        return res.status(400).send({
            errorMessage: '비밀번호에 아이디가 포함되면 안됩니다.',            
        });        
    }

    if (password !== password2) {
        return res.status(400).send({
            errorMessage: '비밀번호와 비밀번호 확인란은 일치해야합니다.',            
        });        
    }

    const olduser = await User.find({ $or: [{email}, {nickname}], });

    if (olduser.length) {
        return res.status(400).send({
            errorMessage: '중복된 이메일 또는 닉네임입니다.',            
        });
    }

    const user = new User({email, password, nickname});
    user.save();

    res.status(200).send({});
});


module.exports = router;