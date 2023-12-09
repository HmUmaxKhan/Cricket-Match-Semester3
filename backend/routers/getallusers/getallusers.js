const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");


router.get("/getallusers", async(req,res)=>{

    const details = await querySql({
        query:"SELECT CNIC From users WHERE usertype = ?",
        values:["hoteladmins"]
    }) 
    if (!details|| details==null) {
        res.status(200).json({details:null})
    }
    res.status(200).json({details:details});
})

module.exports = router

