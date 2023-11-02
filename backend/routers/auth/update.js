const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");

router.put("/update",
async(req,res)=>{
    let {FName,LName,Username,Phone,Email,CNIC} = req.body;

    console.log(FName,LName,Username,Phone,Email,CNIC);

    try {

          
        // check if user is authenticated or not
        let user = await querySql({
            query: "Update Users Set FName=? , LName=?, Username=?, Phone=?, Email=? WHERE CNIC = ?",
            values: [FName,LName,Username,Phone,Email,CNIC],
          });

          console.log(user);

          if(user){
            res.status(200).json({Details:"Your Info has been updated"});
          }
        
    } catch (error) {
        res.status(600).json({ERROR:"You are gettinhg error"});
    }
})

module.exports = router;