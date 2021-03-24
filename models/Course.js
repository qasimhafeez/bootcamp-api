const mongoose = require("mongoose");

// Schema
const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Add a title"],
  },
  description: {
    type: String,
    required: [true, "Add a description"],
  },
  weeks: {
    type: String,
    required: [true, "Add weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Add tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Add a minimum skill"],
    enum: ["beginner, intermediate, advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
