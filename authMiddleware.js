const jwt = require("jsonwebtoken");
const SECRET = "photoshala_secret";

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
};
