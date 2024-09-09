
const {setUser} = require("../service/auth")

const USER = require("../models/userModel.js")
async function handleUserSignUp(req, res){
    await USER.create({
        username : req.body.name, 
        password : req.body.password,
        email : req.body.email ,
    })
    return res.redirect("/")

}
module.exports = {
    handleUserSignUp
}
async function handleUserLogin(req, res){
    const user = await USER.find({
        password : req.body.password,
        email : req.body.email ,
    })
    console.log(user)
    if (user.length === 0){
        res.render("login",{
            error : "Invalid username or password"
        })
    }
    else{
        const token = setUser(user[0])
        console.log('Generated token:', token)
        res.cookie("token", token)
        // res.json({token})
        return res.redirect("/")
        

    }
   

}
module.exports = {
    handleUserSignUp,handleUserLogin
}