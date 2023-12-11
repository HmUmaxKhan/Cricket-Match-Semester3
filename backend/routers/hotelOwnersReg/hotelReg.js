const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");


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
  let newUserObj={userId:user_id,admin_id:admin_id,UserName:UserName,token:token}
  
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
      ImageUrl
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
        INSERT INTO Hotels (Email, Name, City, PhoneNumber, Address, Description, RoomPrice, RoomCapacity, WebUrl, admin_id,venue_id,ImageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
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
        venue[0].venue_id,
        ImageUrl
      ],
    });

    // Respond with success
    res.json({ success: true, message: 'Hotel registration successful' });
  } catch (error) {
    console.error('Error registering hotel:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/paymentadmin', async (req, res) => {
  try {
    const { Name, amount, package_id, startingDate, expiringDate, admin_id } = req.body;

    // Insert payment details into the database
    const result = await querySql({
      query: `
        INSERT INTO PaymentAdmin (Name, amount, package_id, startingDate, expiringDate, admin_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      values: [Name, amount, package_id, startingDate, expiringDate, admin_id],
    });

    // Respond with success
    res.json({ success: true, message: 'Payment details saved successfully' });
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get("/pricehostel",
async(req,res)=>{

  let result = await querySql({
      query: `
      Select package_id ,packageFee,DurationInDays from Packages where packageName = 'hotel'
      `,
      values: [],
    });

    res.status(200).json({results:result[0]})
})


// This is login Api
router.post("/hotelloginadmin", async(req,res)=>{

    try {
    // Fetching Data from the body
    const{UserName,Password} = await (req.body);

    console.log(UserName);
    console.log(Password);

    // Taking Data from the Sql
    const results = await querySql({
        query:"SELECT * FROM users WHERE UserName = ?",
        values:[UserName]
    });

    // Checking if User is Present or Not

    const len = results.length;

    if (!results || len==0) {
        return res.json({Msg:"User with this username is not exits"})
    }
    
    // Comparing Hash Password and Simple Password

    let Pass = results[0].Password;

    
    let Boo = bcrypt.compareSync(Password,Pass)

    if (!Boo) {
        return res.json({Msg:"Invalid Password"})

    }else{

        let userid = String(results[0].user_id);

    // If User is valid then assigning him a token
    const token = JWT.sign({EmailAddress:results[0].EmailAddress,userId:userid},"Hello World , My life is js");

    // Last response 
    return res.status(201).json({user_id:userid, Fname:results[0].Fname,Lname:results[0].Lname,EmailAddress:results[0].EmailAddress,UserName,Contact:results[0].Contact,Address:results[0].Address,token,usertype:results[0].usertype});
    }

} catch (error) {
 console.log(error);       
}
    
})


router.get("/allhotelinfo",AuthToken,
async(req,res)=>{
  const user_id = req.userId;
  console.log(user_id);

  let result = await querySql({
    query: `
      SELECT * FROM Hotels WHERE admin_id = (SELECT admin_id FROM Admins WHERE user_id = ?)
    `,
    values: [user_id],
  });

  res.status(200).json({result:result[0]})
  
})

module.exports = router
