const User = require("../models/user.js");

module.exports.signupGetForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signupPostForm = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                req.flash("error", "error occured in login directly after signup")
                next(err);
            }
            req.flash("success", "welcome to wonderlust");
            res.redirect("/listings");
        })
    }
    catch (e) {
        req.flash("error", e.errorMsg);
        res.redirect("/signup")
    }
}

module.exports.loginGetForm = (req, res) => {
    res.render("users/login.ejs");
}
module.exports.loginPostForm = async (req, res) => {
    req.flash("welcome to wonderland !");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
}