const express = require("express")
const router = express.Router()
const controllers = require("../controllers/reviewController")
const userMiddleware = require("../middleware/userMiddleware")
const multer = require("../middleware/multer")

router.route("/reviews/:id").post(multer.single("file"),controllers.reviews)
router.route("/getReviews").get(userMiddleware,controllers.getReviews)
router.route("/getReviewsById/:id").get(userMiddleware,controllers.getReviewsById)
router.route("/deleteReviews/:id").delete(userMiddleware,controllers.deleteReviews)
router.route("/updateReviewsById/:id").put(userMiddleware,multer.single("file"),controllers.updateReview)


module.exports = router 