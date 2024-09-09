const express = require("express")
const router = express.Router()
const { handleUserSignUp, handleUserLogin } = require("../controllers/userHandler.js")

router.post("/signup", handleUserSignUp)
router.post("/login", handleUserLogin)



module.exports = router
