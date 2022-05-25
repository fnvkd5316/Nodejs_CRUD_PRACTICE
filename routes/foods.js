const express = require("express");
const Foods = require("../schemas/schema_food.js");

const router = express.Router();

// /foods 가 base

router.get("/", (req, res) => { //음식 조회
    res.send("None");
});

router.post("/", async (req, res) => { //음식 등록
    const { 
        writer,
        password,
        foodName,
        category,
        thumbnailUrl,
        comment,
        expirationDate,
        changeDate,
        modification
    } = req.body;

    await Foods.create({
        writer,
        password: Number(password),
        foodName,
        category,
        thumbnailUrl,
        comment,
        expirationDate,
        changeDate,
        modification
    });    

    res.json({
        success: true,
        msg: "등록 되었습니다."
    });
});

router.delete("/", (req, res) => { //음식 삭제
    res.json({
        success: true,
    });

});

router.put("/", (req, res) => { //음식 내용 수정
    res.json({
        success: true,
    });

});

module.exports = router;