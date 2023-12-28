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

        let userid = String(results[0].user_id);
        let img = results[0].ProfilePhoto

    // If User is valid then assigning him a token
    const token = JWT.sign({EmailAddress:results[0].EmailAddress,userId:userid,img:img},"Hello World , My life is js");

    // Last response 
    return res.status(201).json({user_id:userid, Fname:results[0].Fname,Lname:results[0].Lname,EmailAddress:results[0].EmailAddress,UserName,Contact:results[0].Contact,Address:results[0].Address,token,img:img});
    }

} catch (error) {
 console.log(error);       
}
    
})

router.post('/getuser',AuthToken,
async (req, res)=>{
    try {
        console.log("token authenticate");
        console.log(req.userId);
        res.json({user_id:req.userId});
    } catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
      }

})

module.exports = router

