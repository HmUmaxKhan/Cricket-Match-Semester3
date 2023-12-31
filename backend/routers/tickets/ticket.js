const express = require("express");
const router = express.Router();
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");

// This Ticket Api
router.post("/tickets", async (req, res) => {
  // Fetching Data from the Body
  let { match_id } = req.body;

  const results = await querySql({
    query: "SELECT * FROM tickets WHERE  match_id = ?",
    values: [match_id],
  });
  return res.status(200).json({ result: results });
});

router.post("/ticketbook", async (req, res) => {
  let { match_id, user_id, quantity, Category, price, ticket_id } = req.body;

  const results = await querySql({
    query:
      "SELECT TicketNumber FROM Booked_Tickets WHERE  match_id = ? and user_id=? and Category = ?",
    values: [match_id, user_id, Category],
  });

  let noTickets = await querySql({
    query: "SELECT total_seats FROM tickets WHERE  ticket_id = ?",
    values: [ticket_id],
  });

  let allotedSeats = await querySql({
    query: "SELECT TicketNumber FROM Booked_Tickets where Category = ?",
    values: [Category],
  });

  allotedSeats = allotedSeats.length;
  console.log("alloted seats:" , allotedSeats);

  noTickets = noTickets[0].total_seats;

  console.log(noTickets);

  let len = results.length;
  let remaining = 4 - len;

  console.log(remaining);
  console.log(quantity);
  console.log(remaining-quantity);

  if (remaining < quantity) {
    return res.status(201).json({
      Msg: `You can select only 4 tickets in each category and your remaining tickets in this category is ${remaining}`,
    });
  } else {
    for (let i = 0; i < quantity; i++) {
      if (noTickets > allotedSeats) {
        await querySql({
          query: "INSERT into Booked_Tickets (Category,match_id,price,user_id,ticket_id)Values(?,?,?,?,?)",
          values: [Category,match_id,price,user_id,ticket_id],
        });
      }else {
        return res.status(200).json({success:false,Msg:`All tickets are sold out`})
      }
    }
  }

  return res.status(200).json({success:true,Msg:`Tickets are bought successfully`})
});

module.exports = router;
