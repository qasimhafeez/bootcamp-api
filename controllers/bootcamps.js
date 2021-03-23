// @desc      Get all Bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootCamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all Bootcamps" });
};

// @desc      Get single Bootcamp
// @route     GET /api/v1/bootcamp/:id
// @access    Public
exports.getBootCamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all Bootcamps" });
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamp/:id
// @access    Private
exports.createBootCamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all Bootcamps" });
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamp/:id
// @access    Private
exports.updateBootCamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all Bootcamps" });
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Private
exports.deleteBootCamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all Bootcamps" });
};
