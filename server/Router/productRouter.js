const express = require("express")
const router = express.Router()
const controllers = require("../controllers/productController")
const userMiddleware = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")
const multer = require("../middleware/multer")


router.route("/createProduct").post(userMiddleware,adminMiddleware,multer.single("file"),controllers.createProduct)
router.route("/getAlltProducts").get(userMiddleware,controllers.getAlltProducts)

router.route("/getProductByCategory/:category").get(userMiddleware,controllers.getProductByCategory)
router.route("/getProductById/:id").get(userMiddleware,controllers.getProductById)

router.route("/deleteProduct/:id").delete(userMiddleware,adminMiddleware,controllers.deleteProduct)
router.route("/updateProduct/:id").put(userMiddleware,adminMiddleware,multer.single("file"),controllers.updateProduct)


module.exports = router 