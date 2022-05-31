const express = require("express");
const Foods = require("../schemas/schema_food.js");
const User = require("../schemas/schema_user.js");
const Comment = require("../schemas/schema_comment.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

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
        contents,
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
        contents,
        expirationDate,
        changeDate,
        modification,
        commentNum: 0,
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
        contents,
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
                    contents,
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

router.get("/:foodId", async (req, res) => { //음식 상세 조회

    const {foodId} = req.params;

    const food = await Foods.findOne({ foodId }, { '_id': false, 'password': false });

    res.json({
        food,
    });
});

router.get("/:foodId/comments", async (req, res) => {

    const {foodId} = req.params;

    const comment_list = await Comment.find({ foodId }).exec();

    if (!comment_list.length) {
        return res.status(400).send({
            errorMessage: "등록된 댓글이 없습니다.",
        })
    }

    res.send({
        comment_list,
    });
});

router.post("/:foodId/comments", authMiddleware, async (req, res) => {

    const {foodId}  = req.params;
    const {comment} = req.body;
    const {user}    = res.locals;

    await Comment.create({ foodId, userId: user.userId, nickname: user.nickname, comment});

    res.status(201).send({});
});

module.exports = router;