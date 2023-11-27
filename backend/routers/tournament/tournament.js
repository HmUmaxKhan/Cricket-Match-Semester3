const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");

// This is login Api
router.get("/tournament", async(req,res)=>{

    try {
    // Taking Data from the Sql
    const results = await querySql({
        query:"SELECT * FROM tournament"
    });

    // Checking if the result is present or not
    if (!results || results.length===0) {
        res.status(204).json({Msg:"There are no Tournaments"})
    }

    
    res.status(201).json({result:results})

} catch (error) {
 console.log(error);       
}
    
})


module.exports = router

