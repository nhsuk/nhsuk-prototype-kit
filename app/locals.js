module.exports = (config) => (req, res, next) => {
  res.locals.serviceName = config.serviceName;

  next();
};
