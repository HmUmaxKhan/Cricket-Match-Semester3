const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const querySql = require("../../dbConnection/db");

//Getting Tickets

router.post("/gettickets",
async(req,res)=>{

    const {match_id} = req.body

    const result = await querySql({
        query:"Select  * from tickets where match_id = ?",
        values:[match_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No tickets are found"})
    }

    return res.status(200).json(result);
})


//get single match

router.post("/getsingletickets",
async(req,res)=>{
    const {ticket_id} = req.body;

    const result = await querySql({
        query:"select * from tickets where ticket_id=?;",
        values:[ticket_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No ticket are found"})
    }

    return res.status(200).json(result[0]);

})

//Adding Tickets
router.post("/addtickets",
async(req,res)=>{

    const {match_id,Category,AddingDate,price,total_seats,user_id} = req.body


    const result = await querySql({
        query: "INSERT INTO tickets (match_id,Category,price,total_seats,AddingDate,user_id) values (?,?,?,?,?,?)",
        values: [match_id,Category,price,total_seats,AddingDate,user_id]
    });

    if (!result || result.length === 0) {
       return res.status(201).json({Msg:"Ticket is not added"})
    }

    return res.status(200).json({Msg:"Ticket is inserted"});
})

//Updating Matches
router.put("/updatetickets",
async(req,res)=>{
    // Last working is here
    const {ticket_id,Category,AddingDate,price,total_seats} = req.body

    const result = await querySql({
        query: "Update tickets Set Category = ?, price= ?,total_seats = ?, AddingDate = ? where ticket_id = ?",
        values: [Category,price,total_seats,AddingDate,ticket_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"Error in the Query"})
    }

    return res.status(200).json({Msg:"Ticket Details are updated"});
})




//Deleting Matches
router.delete("/deleteticket",
async(req,res)=>{
    const {ticket_id} = req.body

    const result3 = await querySql({
        query: "Delete From Booked_Tickets where ticket_id = ?" ,
        values: [ticket_id]
    });

    const result2 = await querySql({
        query: "Delete From tickets where ticket_id = ?",
        values: [ticket_id]
    });



    if (!result2 || result2.length === 0) {
        return res.status(201).json({Msg:"No tickets are found"})
    }

    return res.status(200).json({Msg:"Tickets are deleted"});
})




/***********************Packages APIs**********************/


router.get("/getpackages",
async(req,res)=>{

    const result = await querySql({
        query:"Select  * from Packages",
        values:[]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No Packages are found"})
    }

    return res.status(200).json(result);
})


//get single match

router.post("/getsinglepackage",
async(req,res)=>{
    const {package_id} = req.body;

    const result = await querySql({
        query:"select * from Packages where package_id=?;",
        values:[package_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No Packages are found"})
    }

    return res.status(200).json(result[0]);

})

//Adding Tickets
router.post("/addpackages",
async(req,res)=>{

    const {DurationInDays,packageName,packageFee,AddingDate,category,user_id} = req.body


    const result = await querySql({
        query: "INSERT INTO Packages (DurationInDays,packageName,packageFee,AddingDate,category,user_id) values (?,?,?,?,?,?)",
        values: [DurationInDays,packageName,packageFee,AddingDate,category,user_id]
    });

    if (!result || result.length === 0) {
       return res.status(201).json({Msg:"Package is not added"})
    }

    return res.status(200).json({Msg:"Package is "});
})

//Updating Matches
router.put("/updatepackages",
async(req,res)=>{
    // Last working is here
    const {package_id,DurationInDays,packageName,packageFee,AddingDate} = req.body

    console.log(AddingDate);

    const result = await querySql({
        query: "Update Packages Set DurationInDays = ?, packageName = ?, packageFee = ?, AddingDate = ? where package_id = ?",
        values: [DurationInDays,packageName,packageFee,AddingDate,package_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"Error in the Query"})
    }

    return res.status(200).json({Msg:"Package Details are updated"});
})




//Deleting Matches
router.delete("/deletepackage",
async(req,res)=>{
    const {package_id} = req.body

    const result = await querySql({
        query: "Delete From Packages where package_id = ?" ,
        values: [package_id]
    });



    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No tickets are found"})
    }

    return res.status(200).json({Msg:"Tickets are deleted"});
})

module.exports = router

