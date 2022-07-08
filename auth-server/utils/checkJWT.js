const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];
    try {
      var decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = {
        userId: decoded.userId,
      };
      next();
    } catch (err) {
      return res.status(403).json({ message: "invalid token" });
    }
  }
};

module.exports = checkJWT;
