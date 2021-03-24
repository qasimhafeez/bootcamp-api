const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = err.statusCode;
  error.message = error.message;

  console.log(err.stack.red);
  // Mongoose bad objectID
  if (err.name === "CastError") {
    const message = `${err.value} id not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplicate ID Error
  if (err.code === 11000) {
    const message = `${err.value} id already exists`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
