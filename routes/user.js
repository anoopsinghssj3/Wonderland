const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/warpAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
    .get(userController.signupGetForm)
    .post(wrapAsync(userController.signupPostForm))

router.route("/login")
    .get(userController.loginGetForm)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login", failureFlash: true
    }), userController.loginPostForm);

router.get("/logout", userController.logout)

module.exports = router;