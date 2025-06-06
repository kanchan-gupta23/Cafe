const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
    },
  products:[{
    product:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
  
    },
    quantity:Number,
   
   
    }],
   
    totalItems:{
        type:Number,
       
    },
    totalAmount:{
        type:Number
    }, 
        

},{
    timestamps:true
})


const Cart = mongoose.model("Cart",  cartSchema)
module.exports = Cart