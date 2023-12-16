const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");

// This is login Api
router.post("/rootlogin", async(req,res)=>{

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

    if (results[0].usertype!=="rootadmin") {
        res.status(401).json({Msg:"You are not allowed to access this"})
    }
    
    // Comparing Hash Password and Simple Password

    let Pass = results[0].Password;

    
    

    if (Pass!==Password) {
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

router.get("/gettournaments",
async(req,res)=>{
    const result = await querySql({
        query:"SELECT * FROM tournament ",
        values:[]
    });

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json(result);
})

router.post("/addtournament",
async(req,res)=>{

    const {TournamentName,StartingDate,EndingDate,AddingDate,ImageUrl} = req.body


    const result = await querySql({
        query: "INSERT INTO tournament (TournamentName, StartingDate, EndingDate, AddingDate,ImageUrl) VALUES (?, ?, ?, ?,?)",
        values: [TournamentName, StartingDate, EndingDate, AddingDate,ImageUrl]
    });
    

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json({Msg:"Tournament is inserted"});
})

router.put("/updatetournament",
async(req,res)=>{
    const {tournament_id,TournamentName,StartingDate,EndingDate,AddingDate} = req.body

    const result = await querySql({
        query: "Update tournament Set TournamentName = ?, StartingDate = ?, EndingDate = ?, AddingDate = ? where tournament_id = ?" ,
        values: [TournamentName, StartingDate, EndingDate, AddingDate,tournament_id]
    });

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json({Msg:"Tournament is updated"});
})



router.delete("/deletetournament",
async(req,res)=>{
    const {tournament_id} = req.body

    const result = await querySql({
        query: "Delete From tournament where tournament_id = ?" ,
        values: [tournament_id]
    });

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json({Msg:"Tournament is deleted"});
})

module.exports = router

