const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  redirectURL: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  visitHistory: [
    {
      timeStamp: { type: Number, required: true },
    },
  ],
});
const URL = mongoose.model("url", urlSchema);
module.exports = URL;
