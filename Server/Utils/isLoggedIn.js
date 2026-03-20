import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => { //checks if user is logged in
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "You must be logged in",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next(); // allow request
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default isLoggedIn;