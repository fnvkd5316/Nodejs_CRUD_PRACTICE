const express = require("express");
const Foods = require("../schemas/schema_food.js");

const router = express.Router();

// /foods 가 base

router.get("/", async (req, res) => { //음식 조회
    const foods = await Foods.find({}, {'_id': false,'password': false});

    res.json({
        success: true,
        foods,
    });
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

    let foodId = foodId();

    await Foods.create({
        foodId,
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

    const existsFood = await Foods.find({ foodId: Number(foodId), password: Number(password)});

    if (!existsFood.length) {
        return res.json({ error: true, msg: "비밀번호가 틀렸거나, 없는 음식입니다." });
    }else {
    await Foods.updateOne({ foodId: Number(foodId), password: Number(password) }, 
                            { $set: { 
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
        success: true,
        msg: "성공적으로 변경되었습니다."
    });
});

function foodId(){
    let foodId = 0;

    foodId = Date.parse(Date());

    return parseInt(foodId);
}

module.exports = router;