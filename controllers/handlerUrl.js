const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleNewShorteningUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json("url not found");
  // if(!body.url.startsWith("http")) return res.status(404).json("url not found")

  const shortID = nanoid(8);
  const existingUrl = await URL.findOne({redirectURL : body.url})
  if(existingUrl){
    // return res.status(409).json({error : " URL already exists in the database "})
    return res.render("Home", {
      existingUrlFromBackend : existingUrl.shortUrl
    })
  }
   
  await URL.create({
    redirectURL: body.url,
    shortUrl: shortID,
    visitHistory: [],
  });
  return res.render("home", { id: shortID });
}


// async function handleAnalyltics(req, res) {

//     const shortUrlId = req.params.shortidurl
//     const result = await URL.findOne({shortUrl : shortUrlId})

//     if(!result) return res.status(404).json("url not found")
  
//     return res.json({TotalClicks : result.visitHistory.length, analyltics : result.visitHistory})
 

// }
async function handleAnalyltics(req, res) {
  const shortUrlId = req.params.shortidurl;
  console.log("Short URL ID:", shortUrlId);

  const result = await URL.findOne({ shortUrl: shortUrlId });
  console.log("Result from DB:", result);

  if (!result) return res.status(404).json("URL not found");

  return res.json({ TotalClicks: result.visitHistory.length, analytics: result.visitHistory });
}
module.exports = { handleNewShorteningUrl , handleAnalyltics};
