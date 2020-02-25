module.exports = config => (req, res, next) => {
  res.locals.serviceName = config.serviceName;
  if (req.session.data["role"] == undefined) {
    req.session.data["role"] = "csas";
  }
  next();
};
