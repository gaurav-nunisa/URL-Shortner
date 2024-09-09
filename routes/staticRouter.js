const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const {restrictTo} = require("../middleware/authMiddleware");


router.get("/user/admin", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  if (allUrls) {
    return res.render("home", {
      urlss: allUrls,
    });
  } else if (!allUrls) {
    return res.status(404).json("allUrls is null bro");
  }
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({createdBy : req.user._id});
  if (allUrls) {
    return res.render("home", {
      urlss: allUrls,
    });
  } else if (!allUrls) {
    return res.status(404).json("allUrls is null bro");
  }
});
router.get("/signup", (req, res) => {
  return res.render("SignUp");
});
router.get("/login", (req, res) => {
  return res.render("Login");
});

module.exports = router;
