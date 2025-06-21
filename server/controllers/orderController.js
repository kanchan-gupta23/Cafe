const Order = require("../models/orderSchema")
const{paymentVerification} = require("../controllers/paymentController")
const Product = require("../models/productSchema")
const Payment = require("../models/PaymentSchema")

const order = async (req,res) => {
    try {
        const {userId} = req.params
        const {   address, products,  totalAmount, status,payment} = req.body
        const validatedProducts = [];
        for (const item of products) {
          const foundProduct = await Product.findById(item.product);
          if (!foundProduct) {
            return res.status(404).json({ msg: `Product not found: ${item.product}` });
          }
    
          validatedProducts.push({
            product: foundProduct._id,
            quantity: item.quantity || 1,
          });
        }
       
        if (paymentVerification){
            const order = await Order.create({user:userId,  address, products:validatedProducts, totalAmount, status:"confirmed",payment})
            res.status(200).json({order,msg:"order created successfully"})
        }
       
    } catch (error) {
        console.log(error);
        
    }
}

const getOrder = async (req,res) => {
    try {
        const {userId} = req.params
        
        
        const order =  await Order.find({user:userId}).populate("products.product")
        console.log(order);
        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        
    }
}
const getAllOrder = async (req,res) => { 
      try {         
        
        const order =  await Order.find().populate("products.product").populate("user")
        console.log(order);
        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        
    }
}

const deleteOrder = async (req,res) => {
    try {
        const {id} = req.params
        const order =  await Order.findByIdAndDelete(id)
        if(!order){
            res.status(400).json({msg:"order not found"})
        }
        res.status(200).json({msg:"order deleted successfully"})
        
    } catch (error) {
        console.log(error);
    }
}

const updateStatus = async (req,res) => {
    try {
        const {id} = req.params
        const {paymentId} = req.body
     
        const order =  await Order.findById(id)
        if(!order){
            res.status(400).json({msg:"order not found"})
        }
        if(order.status==="cancel"){
            return res.status(400).json({ msg: "Order is already canceled" });
        }
        await Order.findByIdAndUpdate(id,{status:"cancel"},{new:true})
        await Payment.findByIdAndDelete(paymentId)
      return  res.status(200).json({order,msg:"order status updated successfully"})
    } catch (error) {
        console.log(error);
    }
}

const getOrderUser = async (req,res) => {
    try {
        const {userid} = req.params
        const order =  await Order.find({user:userid}).populate("user","name email")
        if (orders.length === 0) {
            return res.status(404).json({ msg: "No orders found for this user." });
          }
        res.status(200).json({order,msg:"order of each user"})
    } catch (error) {
        console.log(error);
    }
}
module.exports ={updateStatus, getAllOrder,deleteOrder,getOrder, order,getOrderUser}