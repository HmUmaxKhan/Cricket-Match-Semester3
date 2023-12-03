const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");


// This Registration Api
router.post("/reg", async(req,res)=> {

  // Fetching Data from the Body
  let { Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address } = await req.body;

  // Checking if User is already exits or not
  const results = await querySql({
    query: "SELECT * FROM users WHERE EmailAddress = ?",
    values: [EmailAddress],
  });
  
  let len = results.length;

  if (len>0) {
   res.json({ re: "User Already exits" });
  }

  // Creating a Strong Hash Password
  let salt = bcrypt.genSaltSync(10);
  var Pass = bcrypt.hashSync(Password, salt);

  //Inserting data into Sql
  const user = await querySql({
    query: "INSERT INTO users (Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address) VALUES(?,?,?,?,?,?,?,?)",
    values: [Fname, Lname, EmailAddress, UserName, Pass, Contact,CNIC, Address]
  })

  const userId = await querySql({
    query:"Select user_id From users where EmailAddress = ?",
    values:[EmailAddress]
  })

  // Generating Json Web Token for Authentication
  const token = JWT.sign({EmailAddress:EmailAddress,userId:userId},"Hello World , My life is js")

  // Last Response
  let newUserObj={EmailAddress,UserName,token}
  
  res.json(newUserObj);

  
});

module.exports = router
