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
    const{Username,Password} = await (req.body);

    console.log(Username);
    console.log(Password);

    // Taking Data from the Sql
    const results = await querySql({
        query:"SELECT * FROM Users WHERE Username = ?",
        values:[Username]
    });

    // Checking if User is Present or Not

    const len = results.length;
    console.log(len);

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
    const token = JWT.sign({Email:results[0].Email},"Hello World , My life is js");

    // Last response 
    return res.status(201).json({FName:results[0].FName,LName:results[0].LName,Email:results[0].Email,Username,id:results[0].id,CNIC:results[0].CNIC,Phone:results[0].Phone,Password,token});
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

