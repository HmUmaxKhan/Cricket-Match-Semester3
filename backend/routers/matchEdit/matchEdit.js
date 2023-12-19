const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const querySql = require("../../dbConnection/db");

//Getting Matches

router.post("/getMatches",
async(req,res)=>{

    const {tournament_id} = req.body

    const result = await querySql({
        query:"Select  * from venues v Join matches m on v.match_id = m.match_id where tournament_id = ?",
        values:[tournament_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No tournaments are found"})
    }

    return res.status(200).json(result);
})


//get single match

router.post("/getsinglematch",
async(req,res)=>{
    const {match_id} = req.body;

    const result = await querySql({
        query:"select * from venues v join matches m on v.match_id = m.match_id where m.match_id=?;",
        values:[match_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No matches are found"})
    }

    return res.status(200).json(result[0]);

})

//Adding Matches
router.post("/addmatches",
async(req,res)=>{

    const {tournament_id,match_date,match_time,team1,team2,img,AddingDate,venue_name,location} = req.body


    const result = await querySql({
        query: "INSERT INTO matches (tournament_id,match_date,match_time, team1, team2, AddingDate,img) VALUES (?, ?, ?, ?,?,?,?)",
        values: [tournament_id,match_date,match_time, team1, team2, AddingDate,img]
    });

    const match_id = result.insertId;
    console.log(match_id);

    

    const venue = await querySql({
        query: "INSERT INTO venues (venue_name,match_id,location,AddingDate) VALUES (?, ?, ?, ?)",
        values: [venue_name,match_id,location,AddingDate]
    });

    if (!result || result.length === 0) {
       return res.status(201).json({Msg:"No tournaments are found"})
    }

    return res.status(200).json({Msg:"Tournament is inserted"});
})

//Updating Matches
router.put("/updatematch",
async(req,res)=>{
    const {match_id,match_date,match_time,team1,team2,img,AddingDate,venue_name,location} = req.body

    const result = await querySql({
        query: "Update matches Set match_date=?,match_time=?,team1=?,team2=?,img=?,AddingDate=? where match_id = ?",
        values: [match_date,match_time,team1,team2,img,AddingDate,match_id]
    });
    const result2 = await querySql({
        query: "Update venues Set AddingDate = ?,venue_name = ?,location = ? WHERE match_id = ?",
        values: [AddingDate,venue_name,location,match_id]
    });

    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No tournaments are found"})
    }

    return res.status(200).json({Msg:"Tournament is updated"});
})




//Deleting Matches
router.delete("/deletematch",
async(req,res)=>{
    const {match_id} = req.body
    
    const result1 = await querySql({
        query: "Delete From venues where match_id = ?" ,
        values: [match_id]
    });

    const result2 = await querySql({
        query: "Delete From tickets where match_id = ?" ,
        values: [match_id]
    });

    const result3 = await querySql({
        query: "Delete From Booked_Tickets where match_id = ?" ,
        values: [match_id]
    });

    const result = await querySql({
        query: "Delete From matches where match_id = ?" ,
        values: [match_id]
    });


    if (!result || result.length === 0) {
        return res.status(201).json({Msg:"No tournaments are found"})
    }

    return res.status(200).json({Msg:"Match & its venue is deleted"});
})

module.exports = router

