import jwt from "jsonwebtoken";

const logInUser = async (req, res) => {
  try {
    const user = req.user; // comes from passport
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Authentication failed",
      });
    }
    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,        // cannot be accessed by JS
      secure: true,         // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

export default logInUser;