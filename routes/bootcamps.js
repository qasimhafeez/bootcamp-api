const express = require("express");
const router = express.Router();
const {
  createBootCamp,
  getBootCamp,
  updateBootCamp,
  getBootCamps,
  deleteBootCamp,
} = require("../controllers/bootcamps");

router.route("/").get(getBootCamps).post(createBootCamp);

router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = router;
