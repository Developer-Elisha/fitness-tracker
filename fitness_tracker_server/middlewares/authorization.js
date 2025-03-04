const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = await jwt.verify(token, "secret");
    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  protect,
};
