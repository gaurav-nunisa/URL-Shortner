const express = require("express");
const path = require("path")
const app = express();
const urlRoute = require("./routes/routes");
const port = 8000;
const staticRoute = require("./routes/staticRouter");
const { connectToMongodb } = require("./connect");
const URL = require("./models/url");

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/", staticRoute); // for static page

app.use("/url", urlRoute); //for url shortner

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
