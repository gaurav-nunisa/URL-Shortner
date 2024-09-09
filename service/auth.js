
const jwt = require("jsonwebtoken")
const secret = "123"
function setUser(user){
    const token = jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role
    }, secret)
    console.log('User data:', user) // Add this line to log the user data
    return token
}


function getUser(token){
    if(!token){
        return null
    }
    return jwt.verify(token, secret)
}

module.exports = {
    setUser, 
    getUser
}