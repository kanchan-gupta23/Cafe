require("dotenv").config()
const express  = require("express")
const connection = require("./db")
const cloudinary = require("cloudinary").v2
const router = require("./Router/userRouter")
const product = require("./Router/productRouter")
const reviews = require("./Router/reviewsRouter")
const booking = require("./Router/bookingRouter")  
const cart = require("./Router/cartRouter")  
const cors = require("cors")
const order = require("./Router/orderRouter")
const payment = require("./Router/paymentRouter")
const mongoose = require("mongoose")

const app = express()
const CorsMethods = {
    origin:"http://localhost:5173",
    methods:["PUT","GET","POST","DELETE","PATCH"],
    credentials:true,
}


app.use(cors(CorsMethods))
app.use(express.json())
cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API,
        api_secret: process.env.CLOUD_KEY
    }
)

app.use("/user",router)
app.use("/product",product)
app.use("/reviews",reviews)
app.use("/booking",booking)
app.use("/order",order)
app.use("/cart",cart)
app.use("/payment",payment)


connection().then(()=>
(
    app.listen(3000,()=>{
        console.log("server is running on port 3000");
        
    })
))

mongoose.connection.once('open', async () => {
    try {
      await mongoose.connection.db
        .collection('carts')
        .dropIndex('products.product_1'); // Name may vary, check via db.carts.getIndexes()
      console.log('✅ Dropped invalid unique index on products.product');
    } catch (err) {
      if (err.codeName === 'IndexNotFound') console.log('✅ No index to drop');
      else console.error('❌ Error dropping index:', err);
    }
  });