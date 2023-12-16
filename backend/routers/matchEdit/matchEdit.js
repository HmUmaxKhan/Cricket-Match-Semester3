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
    
    const result = await querySql({
        query: "INSERT INTO matches (TournamentName, StartingDate, EndingDate, AddingDate,ImageUrl) VALUES (?, ?, ?, ?,?)",
        values: [tournament_id,venue_id,match_date,match_time, team1, team2, AddingDate,img]
    });
    

    if (!result || result.length === 0) {
        res.status(201).json({Msg:"No tournaments are found"})
    }

    res.status(200).json({Msg:"Tournament is inserted"});
})

//Updating Matches
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




//Deleting Matches
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

