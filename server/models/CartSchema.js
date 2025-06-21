const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User", required:true },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref:"Product" },
      quantity: Number,
    }],
    totalItems: Number,
    totalAmount: Number,
  }, { timestamps:true });
  
  // Remove this—ineffective and causes confusion:
  // cartSchema.index(...)
  
  cartSchema.pre('save', function(next) {
    this.products = this.products.map(p => ({
      product: p.product == null ? undefined : p.product,
      quantity: p.quantity
    }));
    next();
  });

  const Cart = mongoose.model("Cart", cartSchema)
  module.exports= Cart
  