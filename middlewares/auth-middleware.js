const jwt = require("jsonwebtoken");
const User = require("../schemas/schema_user.js");

module.exports = (req, res, next) => {
    const { authorization } = req.headers; 

    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== 'Bearer') {
        return res.status(401).send({
            errorMessage: "로그인이 필요한 기능입니다.",
        });
    }

    try {
        const { userId } = jwt.verify(tokenValue, "test");

        User.findById( userId ).exec().then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).send({
            errorMessage: "로그인이 필요한 기능입니다.",
        });
    }
};
