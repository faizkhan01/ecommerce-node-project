
const jwt = require('jsonwebtoken');
require('dotenv').config();

// create middleware for check login user from jwt token
const checkLoginUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (typeof token !== "undefined") {
        jwt.verify(token, "loginToken", (err, user) => {
            if (err) {
                res.status(401).send("Invalid User Token");
            } else {
                req.userId = user.userId;
                req.role = user.role;
                next();
            }
        });
    } else {
        res.status(403).send('you have to login first');
    }

}
module.exports = checkLoginUser;
