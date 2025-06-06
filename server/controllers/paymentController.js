const Payment = require("../models/PaymentSchema");
const instance = require("../razorpay")
const crypto = require("crypto")
const Order = require("../models/orderSchema");
const Cart = require("../models/CartSchema")



const createRazorOrder = async (req,res) => {
    try {
        const {amount} = req.body
       
        
        const options = {
            amount : Number(amount*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
           
          };
          const order = await instance.orders.create(options)
          res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
        
    }
}




const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart , booking, order} = req.body;
    const {userId} = req.params

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Replace `your_secret_key` with your actual Razorpay secret key from the Razorpay dashboard
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY ) // secure from .env
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
        const payment = await Payment.create({ razorpay_order_id, razorpay_payment_id, razorpay_signature, user:userId,cart,booking,order})
        

      
        if (payment.cart) {
          await Cart.deleteMany({ user: userId });  
          
        }
        return res.status(200).json({msg:"verification done"})
      // return  res.redirect(`http://localhost:5173/`)
       
      // Signature is valid
     
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getPayment = async (req, res) => {
  try {
    const { cart, booking } = req.body;

    let query = {};
    if (cart) query.cart = cart;
    else if (booking) query.booking = booking;
    else
      return res.status(400).json({ message: "Booking or cart ID is required" });

    const payment = await Payment.findOne(query).populate(cart ? "cart" : "booking");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    console.error("❌ Error in getPayment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


   
    

    

   





module.exports = {createRazorOrder,paymentVerification,getPayment}