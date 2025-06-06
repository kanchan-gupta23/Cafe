const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { url } = require("inspector")
const { types } = require("util")
const { type } = require("os")
const userSchema = mongoose.Schema({
    fullName:{
type:String,
required:true
    },
    attachments:{
url:{
    type:String,
},
public_id:{
    type:String, 
}
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})


userSchema.pre("save",async  function hashPassword (next){
try {
    if (!this.isModified("password")) {
        return next();
      }
  

const hash = await bcrypt.hash(this.password,10)
this.password = hash
next()
} catch (error) {
    console.log(error);
    
}

})

userSchema.methods.comparePassword= async function(password){
   try {
    const Compare = await bcrypt.compare(password,this.password)
    return Compare
   } catch (error) {
    console.log(error);
    
   }
}
userSchema.methods.generateToken =function(){
   try {
 const token=   jwt.sign({
        id: this._id,
        email: this.email,
    },
    process.env.JWT_SCERET_KEY,
    {
        expiresIn:"100d"
    }
)
return token 
   } catch (error) {
    console.log(error);
    
   }
}


const User = mongoose.model("User", userSchema)
module.exports = User