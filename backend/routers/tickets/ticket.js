const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");


// This Ticket Api
router.post("/tickets",AuthToken,
 async(req,res)=> {

  // Fetching Data from the Body
  let { match_id, Category, price} = await req.body;

  const user_id = req.userId

  // Giving new ticket to every user
  let len = 1;
  let seat_number;
  do {
    seat_number = Math.floor(Math.random()*500);
    // Checking if ticket is already given or not
  const results = await querySql({
    query: "SELECT * FROM tickets WHERE  seat_number = ?",
    values: [seat_number],
  });
  len = results.length
  }while (len>0)

  console.log("User id in the tickets>>>>>>>>",user_id,"matchid __ ",match_id, " categ", Category, " price  ",price, "seatnumber>>", seat_number );

  //Inserting data into Sql
  const user = await querySql({
    query: "INSERT INTO tickets (match_id,user_id,Category,price,seat_number) VALUES(?,?,?,?,?)",
    values: [match_id,user_id,Category,price,seat_number]
  })

  // Making Details of Ticket
  const details = await querySql({
    query: "SELECT u.Fname, u.Lname, u.Contact,t.seat_number,t.Category,tou.TournamentName,m.team1,m.team2,m.match_date,v.location,v.venue_name FROM users u JOIN tickets t ON u.user_id = t.user_id JOIN matches m ON t.match_id = m.match_id JOIN tournament tou ON m.tournament_id = tou.tournament_id JOIN venues v ON m.venue_id = v.venue_id WHERE u.user_id = ? AND m.match_id = ?;",

    values: [user_id,match_id]
  })

  return res.status(200).json({details:details[0]})
  
});

module.exports = router
