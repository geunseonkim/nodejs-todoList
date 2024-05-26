const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

// router.post('/', (req, res) => {
//     res.send("create user controller will be here")
// })
router.post('/', userController.createUser)
router.post('/login', userController.loginWithEmail)

module.exports = router;