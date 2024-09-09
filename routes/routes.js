const express = require("express");
const router = express.Router();
const {
  handleNewShorteningUrl,
  handleAnalyltics,
} = require("../controllers/handlerUrl");

router.post("/", handleNewShorteningUrl);
router.get("/analyltics/:shortidurl", handleAnalyltics);

module.exports = router;
