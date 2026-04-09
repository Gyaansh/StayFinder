import User from "../Models/userSchema.js";
async function userSignUp(req, res,next) {
  try {
    let { username, password, email } = req.body;
    const newUser = new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password); // Save new user in Database
    req.user = registeredUser;
    next();

  } catch (err) {
    if (err.name === "UserExistsError") {
      return res.status(400).json({
        field: "username",
        message: err.message,
      });
    }

    res.status(500).json({
      message: err.UserExistsError || "Failed to create New User",
      error: err.message,
    });
  }
}

export default userSignUp;
