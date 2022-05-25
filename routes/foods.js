const express = require("express");
const Foods = require("../schemas/schema_food.js");

const router = express.Router();

//api 로 시작한다.


router.get("/", (req, res) => {

});

router.get("/foods", (req, res) => { //냉장고 내의 음식 나열
    

});



module.exports = router;