const jwt = require('jsonwebtoken');
const tokenKey = 'V&VvmFDnHyX}H5,=GD=ED{ODCB0h~[&jy,>ImL8UyQW{g(-M/kiOPHqPH;bM>Ub';
module.exports = (res, req, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,tokenKey);
    next();
  } catch (error) {
    res.status(404).json({message: "Auth failed"});
  }
}
