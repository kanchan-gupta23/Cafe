const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cart", 
        
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    booking :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"

    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }
}, {
    timestamps: true  // fix typo here
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
