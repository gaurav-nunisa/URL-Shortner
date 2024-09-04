const express = require("express");
const app = express();
const urlRoute = require("./routes/routes");
const port = 8000;
const { connectToMongodb } = require("./connect");
const URL = require("./models/url");

app.use(express.json());

connectToMongodb("mongodb://localhost:27017/URLshortner").then(
  console.log("connected to mongodb DataBase")
);

app.use("/url", urlRoute);

app.get("/:shortidurl", async (req, res) => {
  const shortIdurl = req.params.shortidurl
  const entry = await URL.findOneAndUpdate(
    {shortUrl : shortIdurl  }, 
    {$push : {visitHistory : {timestamp : Date.now()}}})

  res.redirect(entry.redirectURL)
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
