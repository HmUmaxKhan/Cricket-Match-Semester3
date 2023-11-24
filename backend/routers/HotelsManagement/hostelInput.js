const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const querySql = require("../../dbConnection/db");
const AuthToken = require("../../middlewares/authMiddleware");


router.post("/bookinghotel",AuthToken,
async(req,res)=>{
    let {HName,ArrivalDate,DepartureDate,TotalPrice,NoOfRooms,Phone} = req.body;

    console.log(HName);



    try {

        console.log(new Date());

        if (ArrivalDate<new Date()) {
            res.status(400).json({Msg:"Arrival Date is not correct"});
            console.log("Arrival Date is not correct");
        }

        if (DepartureDate<new Date()) {
            res.status(400).json({Msg:"Departure Date is not correct"}); 
            console.log("Departure Date is not correct");
        }

        if (ArrivalDate>DepartureDate) {
            res.status(400).json({Msg:"Arrival Date must not be later than Departure date"});
        }

        if (TotalPrice<=0) {
            res.status(400).json({Msg:"Price must be greater than Rs.0"});
        }

        
        const results = await querySql({
            query:"INSERT INTO Hotels (HName,ArrivalDate,DepartureDate,TotalPrice,NoOfRooms,Phone)",
            values:[HName,ArrivalDate,DepartureDate,TotalPrice,NoOfRooms,Phone]
        });

        const data = await querySql({
            query:"SELECT * FROM Hotels WHERE HName = ?",
            values:[HName]
        });

        res.status(201).json({Details:data[0]})

        
    } catch (error) {
        res.status(505).json({ERROR:error});
        console.log("ERROR: ", error);
    }


    res.status(201).json({Details:results[0]})

})

module.exports = router