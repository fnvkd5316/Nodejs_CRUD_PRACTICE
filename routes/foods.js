const express = require("express");
const Foods = require("../schemas/schema_food.js");
const User = require("../schemas/user.js");

const router = express.Router();

// /foods 가 base

router.get("/", async (req, res) => { //음식 조회
    const foods = await Foods.find({}, { '_id': false, 'password': false });

    res.json({
        foods,
    });
});


function InsertfoodId() {
    let foodId = 0;

    foodId = Date.parse(Date());

    return parseInt(foodId);
}

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

    let foodId = InsertfoodId();

    await Foods.create({
        foodId,
        writer,
        password: password,
        foodName,
        category,
        thumbnailUrl,
        comment,
        expirationDate,
        changeDate,
        modification
    });

    res.json({
        msg: "등록 되었습니다."
    });
});

router.put("/", async (req, res) => { //음식 내용 수정

    const {
        foodId,
        password,
        foodName,
        category,
        thumbnailUrl,
        comment,
        expirationDate,
        changeDate,
        modification
    } = req.body;

    const existsFood = await Foods.find({ foodId: Number(foodId), password });

    if (!existsFood.length) {
        return res.status(400).json({ msg: "비밀번호가 틀렸거나, 없는 음식입니다." });
    } else {
        await Foods.updateOne({ foodId: Number(foodId), password },
            {
                $set: {
                    foodName,
                    category,
                    thumbnailUrl,
                    comment,
                    expirationDate,
                    changeDate,
                    modification
                }
            });
    }

    res.json({
        msg: "성공적으로 변경되었습니다."
    });
});

router.delete("/", async (req, res) => { //음식 삭제

    const {foodId, password} = req.body;

    const result = await Foods.deleteOne({ foodId: Number(foodId), password });

    if (result['deletedCount'] === 0) {
        return res.status(400).json({ msg: "비밀번호가 틀렸거나, 없는 음식입니다." });
    } else{
        res.json({
            msg: "삭제 되었습니다."
        });
    }
});

router.get("/:foodId", async (req, res) => {

    const {foodId} = req.params;

    const food = await Foods.findOne({ foodId }, { '_id': false, 'password': false });

    res.json({
        food,
    });
});

module.exports = router;