const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

authController.authenticate = (req, res, next) => {
    try{
        const tokenString = req.headers.authorization
        if (!tokenString) {
            throw new Error ("invalid token")
        }
        const token = tokenString.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                throw new Error ("invalid token")
            }
            // console.log("payload)
            // User.findById(payload._id) 이 함수의 역할과 적합하지 않음. 너무 많은 걸 물려주면 코드 재활용에 좋지 않음.
            req.userId = payload._id; // 미들웨어
        })
        next();
    } catch (err) {
        res.status(400).json({status: "fail", err: err.message})
    }
}


module.exports = authController