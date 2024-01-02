const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");

router.put("/update",
async(req,res)=>{
    let {Fname,Lname,UserName,Contact,EmailAddress,CNIC,Address,ProfilePhoto} = req.body;

    try {

          
        // check if user is authenticated or not
        let user = await querySql({
            query: "Update users Set Fname=? , Lname=?, UserName=?, Contact=?, EmailAddress=?,Address=? WHERE CNIC = ?",
            values: [Fname,Lname,UserName,Contact,EmailAddress,Address,CNIC],
          });

          if(user){
            res.status(200).json({success:true,Msg:'Info has been updated'});
          }
        
    } catch (error) {
        res.status(600).json({success:false,Msg:'Info has not been updated'});
    }
})

module.exports = router;