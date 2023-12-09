const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");


router.get("/getPriceHostel", async(req,res)=>{

    const details = await querySql({
        query:"SELECT DurationInDays,package_id,packageFee From Packages WHERE packageName = ?",
        values:["hotel"]
    }) 
    if (!details|| details==null) {
        res.status(200).json({details:null})
    }
    res.status(200).json({details:details});
})

module.exports = router

