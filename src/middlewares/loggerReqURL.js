const loggerReqURL = (req, res, next) => {
  const URL = req.originalUrl;
  console.log("Request URL", URL);
  next();
};

module.exports = loggerReqURL;
