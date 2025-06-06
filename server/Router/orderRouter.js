const express = require("express")
const router = express.Router()
const controllers = require("../controllers/orderController")
const userMiddleware = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

router.route("/order/:userId").post(userMiddleware,controllers.order)
router.route("/getOrder/:userId").get(userMiddleware,adminMiddleware,controllers.getOrder)
router.route("/getOrderUser/:userid").get(userMiddleware,controllers.getOrderUser)
router.route("/deleteOrder/:id").delete(userMiddleware,adminMiddleware,controllers.deleteOrder)
router.route("/updateStatus/:id").put(userMiddleware,controllers.updateStatus)


module.exports = router 