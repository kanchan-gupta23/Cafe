const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
    },
  products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            
          },
          quantity: {
            type: Number,
           
            min: [1, 'Quantity cannot be less than 1']
          }
        }
      ],
    
    address:{
type:String,
    },
    booking:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Booking"
    },
   
    totalAmount:{
        type:Number
    },
    status:{
        type:String,
        enum:["pending","confirmed","delivered", "cancelled"],
        default:"pending"
    },
    payment:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:"Payment",
        required:true  
    },
    
    
    
    

    

},{
    timestamps:true
})

const Order = mongoose.model("Order",  orderSchema)
module.exports = Order