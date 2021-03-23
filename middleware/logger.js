// @desc    Logs request to console
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.orignalUrl}`
  );
};

module.exports = logger;
