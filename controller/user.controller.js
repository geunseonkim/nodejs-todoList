const User = require("../model/User")
const bcrypt = require("bcryptjs")
const saltRounds = 10

const userController = {}

// 회원가입-유저 생성
userController.createUser = async(req, res) => {
    try{
        const {email, name, password} = req.body
        const user = await User.findOne({email})
        console.log("user", user) // user DB or null;
        if (user) {
            throw new Error ("you're already a registered user")
        }
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        console.log("hash", hash)
        const newUser = User({email, name, password: hash})
        await newUser.save()
        res.status(200).json({status: "success"})
    } catch (err) {
        res.status(400).json({status: "fail", error: err.message}) // error: err를 해주면 "error": {} 이렇게만 뜨는데, Error 객체를 생성할 때 문자열로만 에러 메시지를 지정해주었기 때문임
    }
}

userController.loginWithEmail = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v")
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password)
            if (isMatch) {
                // 환경 변수 지정, 토큰 발행(유저 모델에서 메소드로 저장)
                const token = user.generateToken();
                return res.status(200).json({status: "success", user, token})
            }
        } throw new Error ("your email or password is not correct")
    } catch (err) {
        res.status(400).json({status: "fail", error: err.message})
    }
}


module.exports = userController