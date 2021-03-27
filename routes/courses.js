const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

// Models
const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");

// Middlewares
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "user"), addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "user"), updateCourse)
  .delete(protect, authorize("publisher", "user"), deleteCourse);

module.exports = router;
