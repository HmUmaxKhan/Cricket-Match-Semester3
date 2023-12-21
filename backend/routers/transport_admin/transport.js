const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");


// This Registration Api
router.post("/transportregown", async(req,res)=> {

  // Fetching Data from the Body
  let { Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address,usertype,ProfilePhoto } = await req.body;

  // Creating a Strong Hash Password
  let salt = bcrypt.genSaltSync(10);
  var Pass = bcrypt.hashSync(Password, salt);

  //Inserting data into Sql
  const user = await querySql({
    query: "INSERT INTO users (Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address,usertype, ProfilePhoto) VALUES(?,?,?,?,?,?,?,?,?,?)",
    values: [Fname, Lname, EmailAddress, UserName, Pass, Contact,CNIC, Address,usertype,ProfilePhoto]
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
    values:[user_id,"transport",0]
  })
  // Last Response
  const admin_id = await querySql({
    query:"Select admin_id From Admins where user_id = ?",
    values:[user_id]
  })
  let newUserObj={userId:user_id,admin_id:admin_id,UserName:UserName,token:token}
  
  return res.json(newUserObj);

  
});

// Login Api

router.post("/transportloginadmin", async(req,res)=>{

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

  let admin_id = await querySql({
    query:"SELECT admin_id,blocked FROM Admins WHERE user_id = ?",
    values:[userid]
});

console.log(admin_id[0]);

  // Last response 
  return res.status(201).json({user_id:userid, Fname:results[0].Fname,Lname:results[0].Lname,EmailAddress:results[0].EmailAddress,UserName,Contact:results[0].Contact,Address:results[0].Address,token,usertype:results[0].usertype,admin_id:admin_id[0].admin_id,blocked:admin_id[0].blocked});
  }

} catch (error) {
console.log(error);       
}
  
})


// Handle POST request for transport registration
router.post('/transportreg', async (req, res) => {
  try {
    const {
        transportName,
        model,
        numberPlate,
        capacity,
        city,
        email,
        website,
        contact,
        ImageUrl,
        AddingDate,
        admin_id
    } = req.body;


    // Insert data into the database
    const result = await querySql({
      query: `
        INSERT INTO Transport (transportName, model, numberPlate, capacity, city, email, website, contact, ImageUrl, admin_id,AddingDate)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
      `,
      values: [
        transportName,
        model,
        numberPlate,
        capacity,
        city,
        email,
        website,
        contact,
        ImageUrl,
        admin_id,
        AddingDate,
      ],
    });


    // const results = await querySql({
    //   query: `
    //     Select * from Hotels where WebUrl = ?
    //   `,
    //   values: [WebUrl],
    // });



    // Respond with success
    return res.status(200).json({ success: true, Msg: 'Hotel registration successful', result });

  } catch (error) {
    console.error('Error registering hotel:', error);
    return res.status(500).json({ success: false, Msg: 'Internal server error' });
  }
});


// Packages

router.post("/pricetransport",
async(req,res)=>{

  const {packageName} = req.body;

  let result = await querySql({
      query: `
      Select package_id ,packageFee,DurationInDays from Packages where packageName = ?
      `,
      values: [packageName],
    });

    res.status(200).json({results:result[0]})
})


// Payment Admin
router.post('/paymentadmin', async (req, res) => {
  try {
    const { Name, amount, package_id, startingDate, expiringDate, admin_id } = req.body;
    console.log(Name,amount,package_id,startingDate,expiringDate,admin_id);

    // Insert payment details into the database
    const result = await querySql({
      query: `
        INSERT INTO PaymentAdmin (Name, amount, package_id, startingDate, expiringDate, admin_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      values: [Name, amount, package_id, startingDate, expiringDate, admin_id],
    });

    const result1 = querySql({
      query:`Update Admins Set blocked = 1 where admin_id = ?`,
      values:[admin_id]
    })

    // Respond with success
    res.json({ success: true, message: 'Payment details saved successfully' });
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.post("/alltransportinfo",
async(req,res)=>{
  const {admin_id} = req.body;
  let result = await querySql({
    query: `
      SELECT * FROM Transport WHERE admin_id = ?
    `,
    values: [admin_id],
  });

  res.status(200).json(result)
  
})


router.post("/getupdatetransportinfo",
async(req,res)=>{
  const {transport_id} = req.body;

  let result = await querySql({
    query: `
      SELECT * FROM Transport WHERE transport_id = ?
    `,
    values: [transport_id],
  });

  res.status(200).json(result[0])
  
})


router.put("/updatetransportinfo",
async(req,res)=>{

  let {
    transport_id,
    transportName,
    model,
    numberPlate,
    capacity,
    city,
    email,
    website,
    contact,
    ImageUrl,
    AddingDate,
    admin_id
} = req.body;

    try {

          
        // check if user is authenticated or not
        let user = await querySql({
            query: "Update Transport Set transportName = ?,model = ?,numberPlate = ?,capacity = ?,city = ?,email = ?,website = ?,contact = ?,ImageUrl = ?,admin_id = ?, AddingDate=? Where transport_id = ?",
            values: [
              transportName,
              model,
              numberPlate,
              capacity,
              city,
              email,
              website,
              contact,
              ImageUrl,
              admin_id,
              AddingDate,
              transport_id
            ],
          });

          if(user){
            res.status(200).json({success:true,Msg:"Transport Info has been updated"});
          }
        
    } catch (error) {
        res.status(600).json({ERROR:"You are gettinhg error"});
    }
});


router.delete("/deletetransport",
async(req,res)=>{

  const {transport_id} = req.body;

  let user1 = await querySql({
    query: "DELETE FROM Route where transport_id = ?",
    values: [transport_id],
  });

  let user = await querySql({
    query: "DELETE FROM Transport where transport_id = ?",
    values: [transport_id],
  });

  return res.status(200).json({success:true,Msg:"Transport is deleted"})

})

module.exports = router;

