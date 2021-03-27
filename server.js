const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
// Load env variables
dotenv.config({ path: "./config/config.env" });

// importing Middlewares
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
// Routes
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");

// DB
connectDB();

const app = express();

//--------------Middlewares----------------//
// Body Parser
app.use(express.json());
// Cookie Parser
app.use(cookieParser());
// Morgan(color)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// File Upload
app.use(fileUpload());
// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/auth/users", users);

app.use(errorHandler);

// Server Config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .bold
  );
});
