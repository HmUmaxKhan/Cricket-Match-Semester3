const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");

// This Registration Api
router.post("/hotelregown", async (req, res) => {
  // Fetching Data from the Body
  let {
    Fname,
    Lname,
    EmailAddress,
    UserName,
    Password,
    Contact,
    CNIC,
    Address,
    usertype,
  } = await req.body;

  // Creating a Strong Hash Password
  let salt = bcrypt.genSaltSync(10);
  var Pass = bcrypt.hashSync(Password, salt);

  //Inserting data into Sql
  const user = await querySql({
    query:
      "INSERT INTO users (Fname, Lname, EmailAddress, UserName, Password, Contact, CNIC, Address,usertype) VALUES(?,?,?,?,?,?,?,?,?)",
    values: [
      Fname,
      Lname,
      EmailAddress,
      UserName,
      Pass,
      Contact,
      CNIC,
      Address,
      usertype,
    ],
  });

  const userId = await querySql({
    query: "Select user_id From users where EmailAddress = ?",
    values: [EmailAddress],
  });

  // Generating Json Web Token for Authentication
  const token = JWT.sign(
    { EmailAddress: EmailAddress, userId: userId },
    "Hello World , My life is js"
  );
  const user_id = userId[0].user_id;
  console.log(user_id);

  const adminInset = await querySql({
    query: "Insert into Admins (user_id,AdminFor,blocked) values (?,?,?)",
    values: [user_id, "hotel", 0],
  });
  // Last Response
  const admin_id = await querySql({
    query: "Select admin_id From Admins where user_id = ?",
    values: [user_id],
  });
  let newUserObj = {
    userId: user_id,
    admin_id: admin_id,
    UserName: UserName,
    token: token,
    success:true,
    Msg:"Successfully Registered"
  };

  return res.json(newUserObj);
});

// Handle POST request for hotel registration
router.post("/hotelreg", async (req, res) => {
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
      ImageUrl,
      AddingDate,
      user_id,
      showing
    } = req.body;

    // Insert data into the database
    const result = await querySql({
      query: `
        INSERT INTO Hotels (Email, Name, City, PhoneNumber, Address, Description, RoomPrice, RoomCapacity, WebUrl, admin_id,ImageUrl,AddingDate,user_id,showing)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)
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
        ImageUrl,
        AddingDate,
        user_id,
        showing
      ],
    });

    const results = await querySql({
      query: `
        Select * from Hotels where WebUrl = ?
      `,
      values: [WebUrl],
    });

    // Respond with success
    return res
      .status(200)
      .json({
        success: true,
        Msg: "Hotel registration successful",
        results,
      });
  } catch (error) {
    console.error("Error registering hotel:", error);
    return res
      .status(500)
      .json({ success: false, Msg: "Internal server error" });
  }
});

router.post("/pricehotel", async (req, res) => {
  const { package_id } = req.body;

  let result = await querySql({
    query: `
      Select package_id ,packageFee,DurationInDays from Packages where package_id = ?
      `,
    values: [package_id],
  });

  return res.status(200).json(result[0]);
});

// This is login Api
router.post("/hotelloginadmin", async (req, res) => {
  try {
    // Fetching Data from the body
    const { UserName, Password } = await req.body;

    console.log(UserName);
    console.log(Password);

    // Taking Data from the Sql
    const results = await querySql({
      query: "SELECT * FROM users WHERE UserName = ?",
      values: [UserName],
    });

    // Checking if User is Present or Not

    const len = results.length;

    if (!results || len == 0) {
      return res.json({success:false ,Msg: "User with this username is not exits" });
    }

    // Comparing Hash Password and Simple Password

    let Pass = results[0].Password;

    let Boo = bcrypt.compareSync(Password, Pass);

    if (!Boo) {
      return res.json({ Msg: "Invalid Password",success:false });
    } else {
      let userid = String(results[0].user_id);

      // If User is valid then assigning him a token
      const token = JWT.sign(
        { EmailAddress: results[0].EmailAddress, userId: userid },
        "Hello World , My life is js"
      );

      let admin_id = await querySql({
        query: "SELECT admin_id FROM Admins WHERE user_id = ?",
        values: [userid],
      });

      console.log(admin_id[0].admin_id);

      // Last response
      return res
        .status(201)
        .json({
          user_id: userid,
          Fname: results[0].Fname,
          Lname: results[0].Lname,
          EmailAddress: results[0].EmailAddress,
          UserName,
          Contact: results[0].Contact,
          Address: results[0].Address,
          token,
          usertype: results[0].usertype,
          admin_id: admin_id[0].admin_id,
          success:true,
          Msg:`Welcome ${UserName}`
        },);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/allhotelinfo", async (req, res) => {
  const { admin_id } = req.body;
  console.log(admin_id);

  let result = await querySql({
    query: `
      SELECT * FROM Hotels WHERE admin_id = ?
    `,
    values: [admin_id],
  });

  return res.status(200).json(result);
});

router.post("/updatehotelinfo", async (req, res) => {
  const { hotel_id } = req.body;
  console.log(hotel_id);

  let result = await querySql({
    query: `
      SELECT * FROM Hotels WHERE hotel_id = ?
    `,
    values: [hotel_id],
  });

  res.status(200).json(result[0]);
});

router.put("/updatehotelinfo", async (req, res) => {
  let {
    hotel_id,
    Email,
    Name,
    City,
    PhoneNumber,
    Address,
    Description,
    RoomPrice,
    RoomCapacity,
    WebUrl,
    ImageUrl,
    AddingDate,
  } = req.body;

  try {
    // check if user is authenticated or not
    let user = await querySql({
      query:
        "Update Hotels Set Email = ?,Name = ?,City = ?,PhoneNumber = ?,Address = ?,Description = ?,RoomPrice = ?,RoomCapacity = ?,WebUrl = ?,ImageUrl = ? AddingDate=? Where hotel_id = ?",
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
        ImageUrl,
        AddingDate,
        hotel_id,
      ],
    });

    if (user) {
      res.status(200).json({ Details: "Your Info has been updated",success:true });
    }
  } catch (error) {
    res.status(600).json({ ERROR: "You are gettinhg error" });
  }
});

router.delete("/deleteHotel", async (req, res) => {
  const { hotel_id } = req.body;

  let user = await querySql({
    query: "DELETE FROM Hotels where hotel_id = ?",
    values: [hotel_id],
  });
});

router.get("/gethotels", async (req, res) => {
  let user = await querySql({
    query: `Select * from Packages Where category = 'hotel' `,
    values: [],
  });

  if (user.length === 0) {
    return res.status(200).json({ Msg: "No Packages are here" });
  }

  return res.status(200).json(user);
});

module.exports = router;
