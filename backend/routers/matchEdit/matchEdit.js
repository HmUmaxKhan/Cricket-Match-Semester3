const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const querySql = require("../../dbConnection/db");

//Getting Matches

router.post("/getMatches",
async(req,res)=>{

    const {tournament_id} = req.body

    const result = await querySql({
        query:"Select  * from venues v Join matches m on m.venue_id = m.venue_id where tournament_id = ?",
        values:[tournament_id]
    });

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json(result);
})

//Adding Matches
router.post("/addmatches",
async(req,res)=>{

    const {tournament_id,match_date,match_time,team1,team2,img,AddingDate,venue_name,location} = req.body

    const venue = await querySql({
        query: "INSERT INTO venues (venue_name,location,AddingDate) VALUES (?, ?, ?)",
        values: [venue_name,location,AddingDate]
    });

    const venue_id = venue.insertId;
    console.log(venue_id);

    const result = await querySql({
        query: "INSERT INTO matches (tournament_id,venue_id,match_date,match_time, team1, team2, AddingDate,img) VALUES (?, ?, ?, ?,?,?,?,?)",
        values: [tournament_id,venue_id,match_date,match_time, team1, team2, AddingDate,img]
    });
    

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json({Msg:"Tournament is inserted"});
})

//Updating Matches
router.put("/updatematch",
async(req,res)=>{
    const {tournament_id,match_id,match_date,match_time,team1,team2,img,AddingDate,venue_name,location} = req.body

    const venue_id = await querySql({
        query:"select venue_id from matches where match_id = ? ",
        values:[match_id]
    })

    const result = await querySql({
        query: "Update matches Set match_date=?,match_time=?,team1=?,team2=?,img=?,AddingDate=? where tournament_id = ? And match_id = ?",
        values: [match_date,match_time,team1,team2,img,AddingDate,tournament_id,match_id]
    });

    console.log(match_id);

    console.log(venue_id[0].venue_id);

    const result2 = await querySql({
        query: "Update venues Set AddingDate = ?,venue_name = ?,location = ? WHERE venue_id = ?",
        values: [AddingDate,venue_name,location,venue_id[0].venue_id]
    });

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json({Msg:"Tournament is updated"});
})




//Deleting Matches
router.delete("/deletematch",
async(req,res)=>{
    const {match_id} = req.body

    const venue_id = await querySql({
        query:"select venue_id from matches where match_id = ? ",
        values:[match_id]
    })

    const result = await querySql({
        query: "Delete From matches where match_id = ?" ,
        values: [match_id]
    });

    const result1 = await querySql({
        query: "Delete From venues where venue_id = ?" ,
        values: [venue_id[0].venue_id]
    });

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json({Msg:"Match & its venue is deleted"});
})

module.exports = router

