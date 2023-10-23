const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");


// This Registration Api
router.post("/reg", async(req,res)=> {

  // Fetching Data from the Body
  let { FName, LName, Email, Username, Password, Phone } = await req.body;

  // Checking if User is already exits or not
  const results = await querySql({
    query: "SELECT * FROM Users WHERE Email = ?",
    values: [Email],
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
    query: "INSERT INTO Users (FName, LName, Email, Username, Password, Phone) VALUES(?,?,?,?,?,?)",
    values: [FName, LName, Email, Username, Pass, Phone]
  })

  // Generating Json Web Token for Authentication
  const token = JWT.sign({Email:Email},"Hello World , My life is js")

  // Last Response
  let newUserObj={Email,Username,token}
  
  res.json(newUserObj);

  
});

module.exports = router