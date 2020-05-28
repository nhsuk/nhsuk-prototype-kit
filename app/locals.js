const patient = require('./data/patient.js');


module.exports = config => (req, res, next) => {
  res.locals.serviceName = config.serviceName;
  if (req.session.data["role"] == undefined) {
    req.session.data["role"] = "csas";
  }

  // load the basic data for PNL
  if (req.session.data["patients"] == undefined) {
    req.session.data["patients"] = patient.getPatients();
  }

  // load the basic data for someone selected as part of the PNL
  if (req.session.data["pnl_patient"] == undefined) {
    req.session.data["pnl_patient"] = patient.getPatient(9991023867);
  }




  next();
};
