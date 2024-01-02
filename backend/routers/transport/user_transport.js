const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");

// This is login Api
router.post("/transportusers", async(req,res)=>{

    const {match_id} = req.body;

    try {
    // Taking Data from the Sql
    let results = await querySql({
        query:"select * from Transport where city = ( select location from venues where match_id = ?)",
        values:[match_id]
    });

    // Checking if the result is present or not
    if (!results || results.length===0) {
       return  res.status(204).json({Msg:"There are no Transport in this City"})
    }

    results = results.filter(result=>result.showing===1);
    
    return res.status(201).json({result:results})

} catch (error) {
 console.log(error);       
}
    
})

module.exports = router

