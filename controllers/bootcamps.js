const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// @desc      Get all Bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  if (!bootcamps) {
    return next(new ErrorResponse(`${req.params.id} id not found`, 404));
  }
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc      Get single Bootcamp
// @route     GET /api/v1/bootcamp/:id
// @access    Public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`${req.params.id} id not found`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamp/:id
// @access    Private
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(res.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamp/:id
// @access    Private
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`${req.params.id} id not found`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Private
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`${req.params.id} id not found`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
