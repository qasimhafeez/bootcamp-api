const express = require("express");
const router = express.Router();
const {
  createBootCamp,
  getBootCamp,
  updateBootCamp,
  getBootCamps,
  deleteBootCamp,
  getBootCampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

// Models
const Bootcamp = require("../models/Bootcamp");

// Middleware
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Include other resources into routes
const courseRouter = require("./courses");
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootCamps)
  .post(protect, authorize("publisher", "user"), createBootCamp);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "user"), bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootCamp)
  .put(protect, authorize("publisher", "user"), updateBootCamp)
  .delete(protect, authorize("publisher", "user"), deleteBootCamp);

router.route("/radius/:zipcode/:distance").get(getBootCampsInRadius);

module.exports = router;
