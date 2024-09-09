const express = require("express");
const path = require("path");
const app = express();
const { connectToMongodb } = require("./connect");
const cookieParser = require("cookie-parser");
const {
  checkForAuthentication, restrictTo
} = require("./middleware/authMiddleware");

const port = 8000;

const urlRoute = require("./routes/routes");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const userRoute = require("./routes/userRoutes");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication)


app.use("/",staticRoute); 
app.use("/url",restrictTo(["NORMAL", "ADMIN"]),  urlRoute); //for url shortner
app.use("/user", userRoute); //used by the form in the signup/LOGIN ejs

connectToMongodb("mongodb://localhost:27017/URLshortner").then(
  console.log("connected to mongodb DataBase")
);

app.get("/:shortidurl", async (req, res) => {
  const shortIdurl = req.params.shortidurl;
  const entry = await URL.findOneAndUpdate(
    { shortUrl: shortIdurl },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
