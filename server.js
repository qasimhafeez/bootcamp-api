const express = require("express");
const dotenv = requite("dotenv");

// Routes
const bootcamps = require("./routes/bootcamps");

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

// Server Config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
