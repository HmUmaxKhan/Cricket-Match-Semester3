const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");


router.post("/listofhotels",AuthToken,
async(req,res)=>{
    let city = req.body.city;

    console.log(city);

    const results = await querySql({
        query:"SELECT * FROM Cities WHERE CityName = ?",
        values:[city]
    });

    res.status(201).json({Details:results[0]})

})

module.exports = router