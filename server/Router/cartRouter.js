const express = require("express")
const router = express.Router()
const controllers = require("../controllers/cartControllers")
const userMiddleware = require("../middleware/userMiddleware")

router.route("/cart").post(userMiddleware,controllers.cart)
router.route("/getCart/:userId").get(userMiddleware,controllers.getCart)
router.route("/updatedQuantity/:userId").put(userMiddleware,controllers.updatedQuantity)


router.route("/deleteCart/:userId").put(userMiddleware,controllers.deleteCart)



module.exports = router 