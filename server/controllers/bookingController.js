const Booking = require("../models/BookingSchema");
const Payment = require("../models/PaymentSchema");

const booking = async (req, res) => {
    try {
        const {userId} = req.params
        const {user,  Occassion,Theme, Date, Description,totalAmount} = req.body
        const booking = await Booking.create({user:userId,  Occassion,Theme, Date, Description,totalAmount, status:"successful"})
        res.status(200).json({booking,msg:"booking created successfully"})
    } catch (error) {
        console.log(error);
    }
}

const getAllBooking = async (req, res) => {
  try {
const {userId} = req.params
console.log(userId);

      const booking = await Booking.find().populate("user")
      res.status(200).json({booking,msg:"All bookings successfully"})
  } catch (error) {
      console.log(error);
      
  }
}

const getBooking = async (req, res) => {
    try {
 const {userId} = req.params
 console.log(userId);
 
        const booking = await Booking.find({user:userId})
        res.status(200).json({booking,msg:"All bookings successfully"})
    } catch (error) {
        console.log(error);
        
    }
}

const getBookingById = async (req,res) => {
    try {
        const {id} = req.params
        const booking = await Booking.findById(id)
        if(!booking ){
            res.status(400).json({msg:" booking  not found"})
        }
        res.status(200).json({booking,msg:"booking by id"})
    } catch (error) {
        console.log(error);
    }
}

const deleteBooking = async (req,res) => {
  try {
    const {id} = req.params
  
    const booking = await Booking.findByIdAndDelete({_id:id, status:"cancel"})
    console.log(booking);
    
    if(!booking ){
        res.status(400).json({msg:" booking  not found"})
    }

 
    await Payment.findOneAndDelete({_id:id})
    
    
    
    res.status(200).json({booking,msg:"booking deleted successfully"})
  } catch (error) {
    console.log(error);
  }  
}

const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the booking first
      const booking = await Booking.findById(id);
  
      if (!booking) {
        return res.status(400).json({ msg: "Booking not found" });
      }
  
      if (booking.status === "cancel") {
        return res.status(400).json({ msg: "Booking is already canceled" });
      }
  
      // Update status to cancel
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { status: "cancel" },
        { new: true }
      );
  
      // Delete corresponding payment
      await Payment.findOneAndDelete({ _id: id });
  
      res.status(200).json({ booking: updatedBooking, msg: "Booking canceled successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
module.exports = {updateStatus,getAllBooking,deleteBooking,getBookingById,getBooking,booking}