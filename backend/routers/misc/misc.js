const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");

// This is login Api
router.post("/getblocked", async(req,res)=>{

    const {admin_id} = req.body;

    console.log(admin_id);

    try {
    // Taking Data from the Sql
    const results = await querySql({
        query:"select blocked from Admins where admin_id = ? ",
        values:[admin_id]
    });

    // Checking if the result is present or not
    if (!results || results.length===0) {
        return res.status(204).json({Msg:"There are no Hotels in this City"})
    }

    console.log(results);

    return res.status(201).json(results[0].blocked)

} catch (error) {
 console.log(error);       
}
    
})

module.exports = router

