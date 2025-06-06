const express = require("express")
const router = express.Router()
const controllers = require("../controllers/paymentController")
const userMiddleware = require("../middleware/userMiddleware")

router.route("/createRazorOrder").post(controllers.createRazorOrder)
router.route("/paymentVerification/:userId").post(controllers.paymentVerification)
router.route("/getPayment").post(controllers.getPayment)



module.exports = router 