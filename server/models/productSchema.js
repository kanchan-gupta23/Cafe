const mongoose = require("mongoose")
const { type } = require("os")
const productSchema = mongoose.Schema({
   productName:{
type:String,
required:true,
unique:true,
    },
   category:{
        enum:["Bestseller","Drinks","Food","ReadyToEat"],
        type:String,
        required:true  
    },
    price:{
        type:Number,
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
    description:{
        type:String,
    }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product