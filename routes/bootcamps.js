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

// Include other resources into routes
const courseRouter = require("./courses");
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootCamps)
  .post(createBootCamp);

router.route("/:id/photo").put(bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

router.route("/radius/:zipcode/:distance").get(getBootCampsInRadius);

module.exports = router;
