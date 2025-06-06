const Reviews = require("../models/reviewSchema")
const uploadCloundinary = require("../features/features")

const reviews = async (req,res) => {
    try {
        const {id} = req.params
        const {user,   review} = req.body
        const file = req.file
      
        let attachments = null
        if(file){
            const result = await uploadCloundinary([file])
            if(result.length>0){
                attachments= {
                    url:result[0].url,
                    public_id:result[0].public_id
                }} else {
                    console.log("Cloudinary upload failed or returned empty result.");
                  }
        }

        
        const reviews = await Reviews.create({user, product:id,  review, attachments})
        res.status(200).json({reviews,msg:"reviews created successfully"})
    } catch (error) {
        console.log(error);
        
    }
}

const getReviews = async (req,res) => {
    try {
        const reviews = await Reviews.find()
        res.status(200).json({reviews,msg:"All reviews "})
    } catch (error) {
        console.log(error);
    }
}
const getReviewsById = async (req,res) => {
    try {
        const {id} = req.params
        const reviews = await Reviews.find({product:id}).populate("user")
        if(!reviews){
            res.status(400).json({msg:"Reviews not found"})
        }
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error);
    }
}

const deleteReviews = async (req,res) => {
    try {
        const {id} = req.params
        const reviews =  await Reviews.findByIdAndDelete(id)
        if(!reviews){
            res.status(400).json({msg:"Reviews not found"})
        }
        res.status(200).json({msg:"Reviews deleted successfully"})
        
    } catch (error) {
        console.log(error);
    }
}

const updateReview = async (req,res) => {
    try {
        const {id} = req.params
        const {user, product,  review} = req.body
        const file = req.file
       
        let attachments = null
       if(file){
        const result = await uploadCloundinary([file])
        if(result.length>0){
            attachments= {
                url:result[0].url,
                public_id:result[0].public_id
            }} else {
                console.log("Cloudinary upload failed or returned empty result.");
              }
       }
        
        const reviews = await Reviews.findByIdAndUpdate(id,{user, product,  review, attachments},{new:true})
        res.status(200).json({reviews,msg:"reviews updated successfully"})

} catch (error) {
        console.log(error);
    }
}
module.exports= {updateReview,deleteReviews,getReviewsById,getReviews,reviews }