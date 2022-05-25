const express = require("express");
const Foods = require("../schemas/schema_food.js");

const router = express.Router();

// /foods 가 base

router.get("/", (req, res) => { //음식 조회
    res.send("None");
});

router.post("/", (req, res) => { //음식 등록
    console.log("들어오긴 하나요?");

    const foodinfo = req.body;

    console.log(foodinfo);

    res.send("None");
});

router.delete("/", (req, res) => { //음식 삭제
    res.send("None");

});

router.put("/", (req, res) => { //음식 내용 수정
    res.send("None");

});

module.exports = router;