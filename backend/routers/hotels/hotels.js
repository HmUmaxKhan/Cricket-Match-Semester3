const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");

// This is login Api
router.post("/hotels", async(req,res)=>{

    const {hotel} = req.body;

    try {
    // Taking Data from the Sql
    const results = await querySql({
        query:"select * from Hotels join RatingOfHotel where Hotels.City  = ? && RatingOfHotel.hotel_id = Hotels.hotel_id",
        values:[hotel]
    });

    // Checking if the result is present or not
    if (!results || results.length===0) {
        res.status(204).json({Msg:"There are no Hotels in this City"})
    }

    console.log(results);

    res.status(201).json({result:results})

} catch (error) {
 console.log(error);       
}
    
})

module.exports = router

