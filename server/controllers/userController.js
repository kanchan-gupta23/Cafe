const User = require("../models/userSchema");
const uploadCloundinary = require("../features/features");
const adminMiddleware = require("../middleware/adminMiddleware");

const userRegistration = async (req,res) => {
   try {
    const {fullName, email,password, phone} = req.body
    const file= req.file
    if(!file){
      return res.status(400).json({msg:"File not found"})
  }
  const result = await uploadCloundinary([file])
  let attachments= null
 if(result.length>0){
  attachments={
      url:result[0].url,
      public_id:result[0].public_id
  }
 }else {
  console.log("Cloudinary upload failed or returned empty result.");
}
    const exists = await User.findOne({email})
    if(exists){
      return  res.status(400).json({msg:"user already exists"})
    }
    const user = await User.create({fullName, email,password, phone,attachments})
    const token = user.generateToken()
   return res.status(200).json({user, token,msg:"user created successfully"})
   } catch (error) {
    console.log(error);
    
   }

}

const userLogin  = async (req,res) => {
    try {
        const {email,password} = req.body
        const exists = await User.findOne({email})
        if (!exists) {
          return res.status(400).json({ msg: "User does not exist" });
        }
      const Compare=   await exists.comparePassword(password)
      if(!Compare){
        return  res.status(400).json({msg:"password is incorrect"})
    }
    const token = await exists.generateToken()
    return res.status(200).json({exists, token,msg:"user Login successfully"})


    } catch (error) {
        console.log(error);
        
    }
}

const getUser = async (req,res) => {
  try {
    const user = req.user
  return res.status(200).json({user})
  } catch (error) {
    console.log(error);
    
  }
}


const admin = async (req,res) => {
  try {
    const{ user} = req.params
    const admin = await User.findByIdAndUpdate(user,{isAdmin:true})
    
    

    return res.status(200).json(admin)
  } catch (error) {
    console.log(error);
    
  }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 1. Find user by email (you forgot `{ email }`)
    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(400).json({ msg: "Admin does not exist" });
    }

    // 🔐 2. Check if password matches
    const compare = await admin.comparePassword(password);
    if (!compare) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }

    // ✅ 3. Check if the user is actually an admin
    if (admin.isAdmin) {
      return res.status(200).json({ msg: "Admin login successful", admin });
    } else {
      return res.status(403).json({ msg: "You are not authorized as admin" });
    }

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


const getAdmin = async (req,res) => {
  try {
    const admin = req.admin
    return res.status(200).json(admin)
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = {userRegistration, userLogin,getUser,admin,getAdmin,adminLogin}