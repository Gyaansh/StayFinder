function logOutUser(req,res){
    res.clearCookie("token",{
      httpOnly: true,        // cannot be accessed by JS
      secure: false,         // true in production (HTTPS)
      sameSite: "strict",
    });

    res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });

}

export default logOutUser;