
const Product = require("../models/productSchema")
const  uploadCloundinary = require("../features/features")

const createProduct = async (req,res) => {
    try {
        const {productName,category,price,description} = req.body
        const file = req.file
        if(!file){
            return res.status(400).json({msg:"File not found"})
        }
        const result = await uploadCloundinary([file])
        let attachments= null
       if(result.length>0){
        attachments={
            url:result[0].url,
            public_id:result[0].public_id
        }
       }else {
        console.log("Cloudinary upload failed or returned empty result.");
      }



       const product = await Product.create({productName,category,price,description,attachments})
       return  res.status(200).json({product,msg:"product created successfully"})
        
    } catch (error) {
        console.log(error);
        
    }
}
const  getAlltProducts = async (req,res) => {
    try {
        const Products = await Product.find()
        return  res.status(200).json(Products)
    } catch (error) {
       console.log(error);
        
    }
}

const getProductByCategory = async (req,res) => {
    try {
        const {category} = req.params
        const products =  await Product.find({category})
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this category." });
          }
        return  res.status(200).json(products)

    } catch (error) {
       console.log(error);
        
    }
}



const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        return  res.status(200).json({msg:"product deleted successfully"})
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async(req,res)=>{
    try {
        const{id} = req.params
        const {productName,category,price,description} = req.body
        const file = req.file
       
        const result = await uploadCloundinary([file])
        let attachments = null
        if(result.length>0){
            attachments={
                url:result[0].url,
                public_id:result[0].public_id
            }
           }else {
            console.log("Cloudinary upload failed or returned empty result.");
          }
          const product = await Product.findByIdAndUpdate(id,{productName,category,price,description,attachments}, { new: true })
          return  res.status(200).json({product,msg:"product update successfully"})
           
        
    
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            res.status(400).json({msg:"product not found"})
        }
        res.status(200).json(product)
        
    } catch (error) {
       console.log(error);
        
    }
    
}
module.exports = {updateProduct,deleteProduct,getProductByCategory, getAlltProducts, createProduct,getProductById}