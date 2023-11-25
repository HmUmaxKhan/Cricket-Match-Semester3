const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");

// This is login Api
router.post("/login", async(req,res)=>{

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
    // If User is valid then assigning him a token
    const token = JWT.sign({EmailAddress:results[0].EmailAddress,UserName:results[0].UserName},"Hello World , My life is js");

    // Last response 
    return res.status(201).json({Fname:results[0].Fname,Lname:results[0].Lname,EmailAddress:results[0].EmailAddress,UserName,id:results[0].id,CNIC:results[0].CNIC,Contact:results[0].Contact,Address:results[0].Address,token});
    }

} catch (error) {
 console.log(error);       
}
    
})

router.post('/getuser',AuthToken,
async (req, res)=>{
    try {
        console.log("token authenticate");
        console.log(req.Email);
        res.json(req.Email);
    } catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
      }

})

module.exports = router

