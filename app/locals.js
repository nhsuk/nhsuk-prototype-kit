module.exports = (config) => (req, res, next) => {
  res.locals.serviceName = config.serviceName;
  res.locals.currentPage = req.path;

  next();
};
