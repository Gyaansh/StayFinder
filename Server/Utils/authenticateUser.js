import passport from "passport";
function authenticateUser(req, res, next){
    passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
        // YOU control failure here 
        return res.status(401).json({
        success: false,
        message: info.message || "Invalid credentials",
        });
    }

    req.user = user;
    next(); // now goes to logInUser
    })(req, res, next);
}
export default authenticateUser;