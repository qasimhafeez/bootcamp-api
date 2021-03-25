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
const { protect } = require("../middleware/auth");

// Include other resources into routes
const courseRouter = require("./courses");
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootCamps)
  .post(protect, createBootCamp);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootCamp)
  .put(protect, updateBootCamp)
  .delete(protect, deleteBootCamp);

router.route("/radius/:zipcode/:distance").get(getBootCampsInRadius);

module.exports = router;
