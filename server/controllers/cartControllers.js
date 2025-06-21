const Cart = require("../models/CartSchema");
const Product =  require("../models/productSchema")


const cart = async (req, res) => {
  try {
    const { user, products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ msg: "No products provided" });
    }

    // Filter valid product entries
    const validProducts = products
      .filter(item => item && item._id)  // Only include items with _id
      .map(item => ({
        _id: item._id,
        quantity: Number.isInteger(item.quantity) && item.quantity > 0
          ? item.quantity
          : 1
      }));

    if (validProducts.length === 0) {
      return res.status(400).json({ msg: "No valid products in request" });
    }

    let cart = await Cart.findOne({ user });

    if (!cart) {
      // Create new cart
      const cartProducts = validProducts.map(i => ({
        product: i._id,
        quantity: i.quantity
      }));

      // Calculate total
      let totalAmount = 0;
      for (const item of cartProducts) {
        const productDoc = await Product.findById(item.product);
        if (!productDoc) continue;
        totalAmount += productDoc.price * item.quantity;
      }

      cart = await Cart.create({
        user,
        products: cartProducts,
        totalAmount,
        totalItems: cartProducts.length
      });

      return res.status(201).json({ cart, msg: "Cart created successfully" });
    }

    // Update existing cart
    for (const newItem of validProducts) {
      const existing = cart.products.find(p => p.product?.toString() === newItem._id);
      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        cart.products.push({
          product: newItem._id,
          quantity: newItem.quantity
        });
      }
    }

    // Remove invalid/null products
    cart.products = cart.products.filter(p => p.product);

    // Recalculate totals
    let totalAmount = 0;
    for (const item of cart.products) {
      const productDoc = await Product.findById(item.product);
      if (!productDoc) continue;
      totalAmount += productDoc.price * item.quantity;
    }

    cart.totalAmount = totalAmount;
    cart.totalItems = cart.products.length;

    await cart.save();

    res.status(200).json({ cart, msg: "Cart updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error, msg: "Internal Server Error" });
  }
};



async function dropIndexes() {
  try {
    await Cart.collection.dropIndexes();
    console.log('Indexes dropped successfully');
  } catch (error) {
    console.error('Error dropping indexes:', error);
  }
}

dropIndexes();
  

const getCart = async (req,res) => {
    try {
        const {userId} = req.params
        // console.log(userId); 
        const getCart = await Cart.find({user:userId}).populate("products.product")
        console.log(getCart);
        
        if (getCart.length === 0) {
            return res.status(400).json({ msg: "No products exist" });
          }
       return  res.status(200).json(getCart)
        
    } catch (error) {
        console.log(error);
        
    }
}

const deleteCart = async (req,res) => {
    try {
        const {userId} = req.params
        const {productId} = req.body
        const cart = await Cart.findOne({user:userId}).populate("products.product")
        cart.products = cart.products.filter(
          (item) => item.product._id.toString() !== productId
        );
    
        // Optional: Recalculate totalItems and totalAmount
        cart.totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalAmount = cart.products.reduce(
          (sum, item) => sum + item.quantity * (item.product.price || 0),
          0
        );
    
        await cart.save();
        
        res.status(200).json({msg:"cart deleted successfully"})

    } catch (error) {
        console.log(error);
    }
}

const updatedQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    const item = cart.products.find(
      (i) => i.product._id.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;

    cart.totalAmount = cart.products.reduce(
      (sum, item) => sum + item.quantity * (item.product.price || 0),
      0
    );

    await cart.save();

    res.json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

  

module.exports ={updatedQuantity,deleteCart, getCart,cart}
