const express = require("express")
const router = express.Router()
const controllers = require("../controllers/bookingController")
const userMiddleware = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

router.route("/booking/:userId").post(userMiddleware,controllers.booking)
router.route("/getBooking/:userId").get(userMiddleware,controllers.getBooking)
router.route("/getAllBooking").get(userMiddleware,adminMiddleware,controllers.getAllBooking)
router.route("/getBookingById/:id").get(userMiddleware,controllers.getBookingById)
router.route("/deleteBooking/:id").delete(userMiddleware,adminMiddleware,controllers.deleteBooking)
router.route("/updateStatus/:id").put(userMiddleware,controllers.updateStatus)


module.exports = router 