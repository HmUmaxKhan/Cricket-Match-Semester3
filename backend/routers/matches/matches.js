const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");

// This is login Api
router.post("/matches", async(req,res)=>{

    const {match} = req.body;

    try {
    // Taking Data from the Sql
    const results = await querySql({
        query:"select * from matches m join venues v on m.match_id=v.match_id where m.tournament_id = ?",
        values:[match]
    });

    // Checking if the result is present or not
    if (!results || results.length===0) {
        return res.status(204).json({Msg:"There are no Tournaments"})
    }

    return res.status(201).json({result:results})

} catch (error) {
 console.log(error);       
}
    
})

module.exports = router

