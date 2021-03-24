const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
// Load env variables
dotenv.config({ path: "./config/config.env" });

// importing Middlewares
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
// Routes
const bootcamps = require("./routes/bootcamps");

// DB
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);

// Server Config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .bold
  );
});
