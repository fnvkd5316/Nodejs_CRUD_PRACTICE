const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/Freeze", { ignoreUndefined: true }) // 27017은 mongodb의 기본 포트다.
        .catch(err => console.error(err));
};

module.exports = connect;