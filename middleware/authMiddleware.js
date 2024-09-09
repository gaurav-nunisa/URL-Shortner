const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  if(!tokenCookie){
    return next()
  }
 const token = tokenCookie
  const user = getUser(token)
  req.user = user
  return next()
}


function restrictTo(roles=[]){
  return function (req, res, next){
    console.log("THE REQ.USER IS " + req.user)
    if (req.path === '/login' || req.path === '/signup') {
      return next(); // Bypass the check for login/signup routes
    }
    if(!req.user) return res.redirect('/login')


    if(!roles.includes(req.user.role)){
      return res.end("unauthorized cause there is no role")
    }
    next()
  }

}



module.exports={
checkForAuthentication, restrictTo
}


// const restrictToLoggedInUserOnly = async (req, res, next) => {
//     try {
//       const userUid = req.headers["authorization"]

//       // const userUid = req.cookies?.uid;

//       if (!userUid) return res.status(401).send('Access denied');

//       const token = userUid.split("Bearer ")[1]
//       // const user = getUser(userUid);
//       const user = getUser(token);

//       if (!user) return res.status(401).send('Access denied');
//       console.log("User from getUser:", user); // Check if _id exists
  
//       req.user = user; 
//       console.log("User from req.user:", req.user);
//       next()
//     } catch (err) {
//         console.error(err); // Log the error
//       res.status(400).send('Error occurred');
//     }
//   };
//   async function checkAuth(req, res, next) {
//     console.log(req.headers);
  
//     const userUid = req.headers["authorization"];
  
//     if (!userUid) {
//       res.status(401).send('Authorization header is missing');
//       return;
//     }
  
//     const token = userUid.split("Bearer ")[1];
  
//     if (!token) {
//       res.status(401).send('Invalid authorization header');
//       return;
//     }
  
//     const user = getUser(token);
  
//     if (!user) {
//       res.status(401).send('Invalid token');
//       return;
//     }
  
//     req.user = user;
  
//     console.log("User from GETUSER req.user:", req.user);
  
//     next();
//   }

// module.exports = {
//   restrictToLoggedInUserOnly,
//   checkAuth,
// };
