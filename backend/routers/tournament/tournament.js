const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");

// This is login Api
router.get("/tournament", async(req,res)=>{

    try {
    // Taking Data from the Sql
    const results = await querySql({
        query:"SELECT * FROM tournament"
    });

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

