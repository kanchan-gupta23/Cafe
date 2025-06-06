const mongoose = require("mongoose")
const { type } = require("os")



const reviewSchema = mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
    },
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
   
    },
  
   review:{
type:String,
required:true
   },

   
  attachments:{
  
        url:{
            type:String
        },
        public_id:{
            type:String
        }
    
  }
    
    
    

    

},{
    timeStamps:true
})

const Reviews = mongoose.model("Reviews",  reviewSchema)
module.exports = Reviews