const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
// Load env variables
dotenv.config({ path: "./config/config.env" });

// importing Middlewares
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
// Routes
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// DB
connectDB();

const app = express();

//--------------Middlewares----------------//
// Body Parser
app.use(express.json());

// Morgan(color)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File Upload
app.use(fileUpload());

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use(errorHandler);

// Server Config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .bold
  );
});
