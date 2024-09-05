const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async(req, res) => {
    const allUrls = await URL.find({})
    if(allUrls){
        return res.render("home", {
            urlss : allUrls
        })
        
    }else if(!allUrls){
        return res.status(404).json("allUrls is null bro");
    }
   

})

module.exports = router