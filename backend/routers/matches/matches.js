const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");

// This is login Api
router.post("/matches", async(req,res)=>{

    const {match} = req.body;

    try {
    // Taking Data from the Sql
    const results = await querySql({
        query:"select * from matches join venues where tournament_id = ?",
        values:[match]
    });

    // Checking if the result is present or not
    if (!results || results.length===0) {
        res.status(204).json({Msg:"There are no Tournaments"})
    }

    console.log(results);

    res.status(201).json({result:results})

} catch (error) {
 console.log(error);       
}
    
})

module.exports = router

