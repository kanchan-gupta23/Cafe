const { timeStamp } = require("console")
const mongoose = require("mongoose")
const { type } = require("os")
const { ref } = require("process")
const bookingSchema = mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
    },
   Occassion:{
        type:String,
        required:true  
    },
    Theme:{
        type:String,
        enum:["horror", "romantic","chill","crazy","cute"],
required:true
    },
    
    Date:{
        type:Date,
        required:true

    },
    Description:{
        type:String,
    },
    totalAmount:{
            type:Number
        },
        status:{
            type:String,
            enum:["cancel", "successful"],
            default:"pending"
        }
     

},
{timeStamps: true})

const Booking = mongoose.model("Booking",  bookingSchema)
module.exports = Booking