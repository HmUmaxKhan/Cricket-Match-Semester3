const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");


// This Registration Api
router.post("/reg", async(req,res)=> {

  // Fetching Data from the Body
  let { Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address,ProfilePhoto } = await req.body;

  // Checking if User is already exits or not
  const results = await querySql({
    query: "SELECT * FROM users WHERE UserName = ?",
    values: [UserName],
  });
  
  let len = results.length;

  if (len>0) {
   return res.json({ success:false,Msg: "User Already exits with same UserName" });
  }

  const results1 = await querySql({
    query: "SELECT * FROM users WHERE EmailAddress = ?",
    values: [EmailAddress],
  });
  
  let len1 = results1.length;

  if (len1>0) {
   return res.json({ success:false,Msg: "User Already exits with same Email Address" });
  }


  const results2 = await querySql({
    query: "SELECT * FROM users WHERE CNIC = ?",
    values: [CNIC],
  });
  
  let len2 = results2.length;

  if (len2>0) {
   return res.json({ success:false,Msg: "User Already exits with same CNIC" });
  }

  const results3 = await querySql({
    query: "SELECT * FROM users WHERE Contact = ?",
    values: [Contact],
  });
  
  let len3 = results3.length;

  if (len3>0) {
   return res.json({ success:false,Msg: "User Already exits with same Phone number" });
  }
  // Creating a Strong Hash Password
  let salt = bcrypt.genSaltSync(10);
  var Pass = bcrypt.hashSync(Password, salt);

  //Inserting data into Sql
  const user = await querySql({
    query: "INSERT INTO users (Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address,ProfilePhoto) VALUES(?,?,?,?,?,?,?,?,?)",
    values: [Fname, Lname, EmailAddress, UserName, Pass, Contact,CNIC, Address,ProfilePhoto]
  })

  const userId = await querySql({
    query:"Select user_id From users where EmailAddress = ?",
    values:[EmailAddress]
  })

  // Generating Json Web Token for Authentication
  const token = JWT.sign({EmailAddress:EmailAddress,userId:userId},"Hello World , My life is js")

  // Last Response
  let newUserObj={success:true,Msg:`Successfully Signed Up`,EmailAddress,UserName,token}
  
  res.json(newUserObj);

  
});

module.exports = router
