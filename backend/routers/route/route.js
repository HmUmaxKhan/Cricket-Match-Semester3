const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");

// This is login Api
router.post("/routes", async(req,res)=>{

    const {transport_id} = req.body;

    try {
    // Taking Data from the Sql
    const results = await querySql({
        query:"select * from Route where transport_id = ?",
        values:[transport_id]
    });

    // Checking if the result is present or not
    if (!results || results.length===0) {
        return res.status(204).json({Msg:"There are no Tournaments"})
    }

    return res.status(201).json(results)

} catch (error) {
 console.log(error);       
}
    
})

module.exports = router

