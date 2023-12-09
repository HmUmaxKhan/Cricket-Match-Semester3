const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");


// This Registration Api
router.post("/hotelregown", async(req,res)=> {

  // Fetching Data from the Body
  let { Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address,usertype } = await req.body;

  // Creating a Strong Hash Password
  let salt = bcrypt.genSaltSync(10);
  var Pass = bcrypt.hashSync(Password, salt);

  //Inserting data into Sql
  const user = await querySql({
    query: "INSERT INTO users (Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address,usertype) VALUES(?,?,?,?,?,?,?,?,?)",
    values: [Fname, Lname, EmailAddress, UserName, Pass, Contact,CNIC, Address,usertype]
  })

  const userId = await querySql({
    query:"Select user_id From users where EmailAddress = ?",
    values:[EmailAddress]
  })

  // Generating Json Web Token for Authentication
  const token = JWT.sign({EmailAddress:EmailAddress,userId:userId},"Hello World , My life is js")
  const user_id = userId[0].user_id
  console.log(user_id);

  const adminInset =await  querySql({
    query:"Insert into Admins (user_id,AdminFor,blocked) values (?,?,?)",
    values:[user_id,"hotel",0]
  })
  // Last Response
  const admin_id = await querySql({
    query:"Select admin_id From Admins where user_id = ?",
    values:[user_id]
  })
  let newUserObj={userId:user_id,admin_id:admin_id,UserName:UserName}
  
  res.json(newUserObj);

  
});

// Handle POST request for hotel registration
router.post('/hotelreg', async (req, res) => {
  try {
    const {
      Email,
      Name,
      City,
      PhoneNumber,
      Address,
      Description,
      RoomPrice,
      RoomCapacity,
      WebUrl,
      admin_id,
    } = req.body;


    const venue = await querySql({
      query: `
      Select venue_id from venues where location = ?
      `,
      values: [
        City
      ],
    });

    console.log(venue);

    // Insert data into the database
    const result = await querySql({
      query: `
        INSERT INTO Hotels (Email, Name, City, PhoneNumber, Address, Description, RoomPrice, RoomCapacity, WebUrl, admin_id,venue_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `,
      values: [
        Email,
        Name,
        City,
        PhoneNumber,
        Address,
        Description,
        RoomPrice,
        RoomCapacity,
        WebUrl,
        admin_id,
        venue[0].venue_id
      ],
    });

    // Respond with success
    res.json({ success: true, message: 'Hotel registration successful' });
  } catch (error) {
    console.error('Error registering hotel:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = router
