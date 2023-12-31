const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");


// This Ticket Api
router.post("/tickets",
 async(req,res)=> {

  // Fetching Data from the Body
  let { match_id} = req.body;

  const results = await querySql({
    query: "SELECT * FROM tickets WHERE  match_id = ?",
    values: [match_id],
  });
  return res.status(200).json({result:results})
  
});

router.post("/ticketbook",
async(req,res)=>{
  let {match_id,user_id,quantity,Category,price} = req.body;

  const results = await querySql({
    query: "SELECT TicketNumber FROM tickets WHERE  match_id = ? and user_id=? and Category = ?",
    values: [match_id,user_id,Category],
  });

  let len = results.length;
  let remaining = 4-len;

  if (remaining<quantity) {
    return res.status(201).json({Msg:`You can select only 4 tickets in each category and your remaining tickets in this category is ${remaining}`})
  }else{
    for (let i = 0; i < quantity; i++) {
      await querySql({
        query: "INSERT into Booked_Ticket ()",
        values: [match_id,user_id,Category],
      });
    }
  }


})

module.exports = router
