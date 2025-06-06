const express = require("express")
const controllers = require("../controllers/userController")
const  router = express.Router()
const userMiddleware = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")
const multer = require("../middleware/multer")

router.route("/userRegistration").post(multer.single("file") ,controllers.userRegistration)
router.route("/userLogin").post(controllers.userLogin)
router.route("/getUser").get(userMiddleware,controllers.getUser)
router.route("/admin/:user").put(userMiddleware,controllers.admin)
router.route("/getAdmin").get(userMiddleware,adminMiddleware,controllers.getAdmin)
router.route("/adminLogin").post(userMiddleware,adminMiddleware,controllers.adminLogin)

module.exports = router 