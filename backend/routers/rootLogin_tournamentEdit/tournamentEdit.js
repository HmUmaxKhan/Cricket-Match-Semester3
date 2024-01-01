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
        return res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json(result);
})

router.post("/getsingletournaments",
async(req,res)=>{

    const {tournament_id} = req.body;

    const result = await querySql({
        query:"SELECT * FROM tournament where tournament_id = ? ",
        values:[tournament_id]
    });

    if (!result || result.length === 0) {
       return  res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json(result[0]);
})


router.post("/addtournament",
async(req,res)=>{

    let {TournamentName,StartingDate,EndingDate,AddingDate,ImageUrl,user_id} = req.body

    console.log(TournamentName,StartingDate,EndingDate,AddingDate,ImageUrl,user_id);

    StartingDate = StartingDate.slice(0,10)
    EndingDate = EndingDate.slice(0,10)
    AddingDate = AddingDate.slice(0,10)

    const result = await querySql({
        query: "INSERT INTO tournament (TournamentName, StartingDate, EndingDate, AddingDate,ImageUrl,user_id) VALUES (?,?,?,?,?,?)",
        values: [TournamentName, StartingDate, EndingDate, AddingDate,ImageUrl,user_id]
    });
    

    if (!result || result.length === 0) {
       return res.status(201).json({success:false,Msg:"No tournaments are found"})
    }

     return res.status(200).json({success:true,Msg:"Tournament is inserted"});
})

router.put("/updatetournament",
async(req,res)=>{
    let {tournament_id,TournamentName,StartingDate,EndingDate,AddingDate,ImageUrl} = req.body

    StartingDate = StartingDate.slice(0,10)
    EndingDate = EndingDate.slice(0,10)
    AddingDate = AddingDate.slice(0,10)

    const result = await querySql({
        query: "Update tournament Set TournamentName = ?, StartingDate = ?, EndingDate = ?, AddingDate = ?, ImageUrl=? where tournament_id = ?" ,
        values: [TournamentName, StartingDate, EndingDate, AddingDate,ImageUrl ,tournament_id]
    });

    if (!result || result.length === 0) {
       return res.status(201).json({success:false,Msg:"No tournaments are found"})
    }

   return res.status(200).json({success:true,Msg:"Tournament is updated"});
})



router.delete("/deletetournament",
async(req,res)=>{
    const {tournament_id} = req.body
    
    const result3 = await querySql({
        query: "Select match_id from matches where tournament_id = ?" ,
        values: [tournament_id]
    });

    console.log(result3);

    const matchId = result3.map((match)=>{return match.match_id})

    console.log(matchId);

    for(let match of matchId){
    await querySql({
        query: "Delete From Booked_Tickets where match_id = ?" ,
        values: [match]
    });
    }

    for(let match of matchId){
        await querySql({
            query: "Delete From tickets where match_id = ?" ,
            values: [match]
        });
    }

    for(let match of matchId){
        await querySql({
            query: "Delete From venues where match_id = ?" ,
            values: [match]
        });
    }

    for(let match of matchId){
        
    await querySql({
        query: "Delete From matches where tournament_id = ?" ,
        values: [match]
    });

    }

    

    const result = await querySql({
        query: "Delete From tournament where tournament_id = ?" ,
        values: [tournament_id]
    });


    if (!result || result.length === 0) {
       return res.status(201).json({Msg:"No tournaments are found"})
    }

   return res.status(200).json({Msg:"Tournament is deleted"});
})



module.exports = router