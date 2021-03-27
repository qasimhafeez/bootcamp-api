const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
// Load env variables
dotenv.config({ path: "./config/config.env" });

// Importing Middlewares
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

// Routes
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

// DB
connectDB();

const app = express();

//--------------Middlewares----------------//
// Body Parser
app.use(express.json());
// Express Mongo Sanitize
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS
app.use(xssClean());
// hpp for security
app.use(hpp());
// Cookie Parser
app.use(cookieParser());
// Morgan(color)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// File Upload
app.use(fileUpload());
// Req rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
// Enable Cors
app.use(cors());
// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/auth/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

// Server Config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .bold
  );
});
