const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")

const userMiddleware = async (req,res,next) => {
    try {
        const token = req.header("Authorization")
        if(!token){
            return res.status(400).json({msg:"token not found"})
        }
        const jwtToken = token.trim().replace("Bearer","")
        const decode = jwt.decode(jwtToken,process.env.JWT_SCERET_KEY)
        const user = await User.findOne({email:decode.email})
    
        
        
        if(!user){
          return res.status(400).json({msg:"user not found"})
        }
        
      req.user = user
     
        req.id = user._id
        req.token = jwtToken
        next()
    } catch (error) {
       console.log(error);
        
    }
}

module.exports= userMiddleware