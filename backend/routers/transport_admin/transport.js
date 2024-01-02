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
  let newUserObj={userId:user_id,admin_id:admin_id[0].admin_id,usertype:usertype,UserName:UserName,token:token,success:true,Msg:`${UserName} registered successfully`}
  
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
      return res.json({Msg:"User with this username is not exits",success:false})
  }
  
  // Comparing Hash Password and Simple Password

  let Pass = results[0].Password;

  
  let Boo = bcrypt.compareSync(Password,Pass)

  if (!Boo) {
      return res.json({Msg:"Invalid Password",success:false})

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
  return res.status(201).json({user_id:userid, Fname:results[0].Fname,Lname:results[0].Lname,EmailAddress:results[0].EmailAddress,UserName,Contact:results[0].Contact,Address:results[0].Address,token,usertype:results[0].usertype,admin_id:admin_id[0].admin_id,blocked:admin_id[0].blocked,success:true,Msg:`Welcome ${UserName}`});
  }

} catch (error) {
console.log(error);  
return res.status(500).json({Msg:`Internal Error`,success:false})     
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
        admin_id,
        user_id
    } = req.body;


    // Insert data into the database
    const result = await querySql({
      query: `
        INSERT INTO Transport (transportName, model, numberPlate, capacity, city, email, website, contact, ImageUrl, admin_id,AddingDate,user_id,showing)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
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
        user_id,
        1
      ],
    });


    // const results = await querySql({
    //   query: `
    //     Select * from Hotels where WebUrl = ?
    //   `,
    //   values: [WebUrl],
    // });



    // Respond with success
    return res.status(200).json({ success: true, Msg: 'Transport registration successful', result });

  } catch (error) {
    console.error('Error registering hotel:', error);
    return res.status(500).json({ success: false, Msg: 'Internal server error' });
  }
});


router.post("/pricetransport",
async(req,res)=>{

  const {package_id} = req.body;

  let result = await querySql({
      query: `
      Select package_id ,packageFee,DurationInDays from Packages where package_id = ?
      `,
      values: [package_id],
    });

    res.status(200).json({results:result[0]})
})


// Payment Admin
router.post('/paymentadmin', async (req, res) => {
  try {
    const { Name, amount, package_id, startingDate, expiringDate, admin_id } = req.body;

    const adminId = await querySql({
      query: `
      Select blocked from Admins WHERE admin_id = ?
      `,
      values: [admin_id],
    });

    if (adminId.length === 0) {

      // Insert payment details into the database
      const result = await querySql({
        query: `
          INSERT INTO PaymentAdmin (Name, amount, package_id, startingDate, expiringDate, admin_id)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        values: [Name, amount, package_id, startingDate, expiringDate, admin_id],
      });
    }
    else{
      const result = await querySql({
        query: `
          UPDATE PaymentAdmin
          SET Name = ?,
              amount = ?,
              package_id = ?,
              startingDate = ?,
              expiringDate = ?
          WHERE admin_id = ?
        `,
        values: [Name, amount, package_id, startingDate, expiringDate, admin_id],
      });
    }    
    const result1 = await querySql({
      query:`Update Admins Set blocked = 1 where admin_id = ?`,
      values:[admin_id]
    })

    const result2 = await querySql({
      query:`Update Hotels Set showing = 1 where admin_id = ?`,
      values:[admin_id]
    })

    const result3 = await querySql({
      query:`Update Transport Set showing = 1 where admin_id = ?`,
      values:[admin_id]
    })

    const blocked = await querySql({
      query:`Select blocked from Admins where admin_id = ?`,
      values:[admin_id]
    })


    // Respond with success
    return res.json({ success: true, Msg: 'Payment details saved successfully', blocked:blocked[0].blocked});
  } catch (error) {
    console.error('Error saving payment details:', error);
    return res.status(500).json({ success: false, Msg: 'Internal server error' });
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


/********************************************Route List*****************************************/


router.post('/addroute', async (req, res) => {
  try {
    const {
        stop,
        arrival_time,
        fare,
        stop_number,
        transport_id,
        user_id
    } = req.body;

    console.log(        stop,
      arrival_time,
      fare,
      stop_number,
      transport_id,
      user_id);

    // Insert data into the database
    const result = await querySql({
      query: `
        INSERT INTO Route (
          stop,
          arrival_time,
          fare,
          stop_number,
          transport_id,
          user_id)
        VALUES (?,?,?,?,?,?)
      `,
      values: [
        stop,
        arrival_time,
        fare,
        stop_number,
        transport_id,
        user_id
      ],
    });

    // Respond with success
    return res.status(200).json({ success: true, Msg: 'Route has been added.', result });

  } catch (error) {
    console.error('Error registering hotel:', error);
    return res.status(500).json({ success: false, Msg: 'Internal server error' });
  }
});



router.post("/allrouteinfo",
async(req,res)=>{
  const {transport_id} = req.body;
  let result = await querySql({
    query: `
      SELECT * FROM Route WHERE transport_id = ?
    `,
    values: [transport_id],
  });

   return res.status(200).json(result)
  
})


router.post("/getupdaterouteinfo",
async(req,res)=>{
  const {route_id} = req.body;
  console.log(route_id);
  let result = await querySql({
    query: `
      SELECT * FROM Route WHERE route_id = ?
    `,
    values: [route_id],
  });

  return res.status(200).json(result[0])
  
})


router.put("/updaterouteinfo",
async(req,res)=>{

  let {
    route_id,
    stop,
    arrival_time,
    fare,
    stop_number,
} = req.body;

console.log(route_id,
  stop,
  arrival_time,
  fare,
  stop_number,);

    try {

          
        // check if user is authenticated or not
        let user = await querySql({
            query: "Update Route Set stop = ?,arrival_time = ?,fare = ?,stop_number = ?  Where route_id = ?",
            values: [
              stop,
              arrival_time,
              fare,
              stop_number,
              route_id,
            ],
          });

          if(user){
           return res.status(200).json({success:true,Msg:"Transport Info has been updated"});
          }
        
    } catch (error) {
       return res.status(600).json({ERROR:"You are gettinhg error"});
    }
});


router.delete("/deleteroute",
async(req,res)=>{

  const {route_id} = req.body;

  let user1 = await querySql({
    query: "DELETE FROM Route Where route_id = ?",
    values: [route_id],
  });


  return res.status(200).json({success:true,Msg:"Route is deleted"})

})



router.get("/getallpackagesbus",
async(req,res)=>{

  let result = await querySql({
    query: `
      SELECT * FROM Packages where category = 'transport'
    `,
    values: [],
  });

  return res.status(200).json(result)
  
})




module.exports = router;