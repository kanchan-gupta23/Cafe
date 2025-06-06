const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")


const adminMiddleware = async (req,res,next) => {
   try {
    const token = req.header("Authorization")
    if(!token){
        return res.status(400).json({msg:"token not found"})
    }

    const jwtToken = await token.trim().replace("Bearer","")

    const decode = jwt.decode(jwtToken,process.env.JWT_SCERET_KEY)

   console.log(decode);
   
    const user = await User.findById(decode.id); 
    console.log(user);
    

    if (!user || user.isAdmin !== true) {
      return res.status(403).json({ msg: "Access denied. Not an admin." });
    }

      req.admin = user

      next()
   } catch (error) {
    console.log(error);
    
   }

}

module.exports = adminMiddleware