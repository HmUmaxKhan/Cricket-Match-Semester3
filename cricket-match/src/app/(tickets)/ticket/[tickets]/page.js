"use client";
import { useSelector } from "react-redux";
import Ticket from "../../commponentsofHotels/Ticket";
import { useState } from "react";

export default function page(params) {
console.log(params.params.tickets);
const details = useSelector((state)=>state.ticketInfo.ticketInfo)
console.log("MainticketPaege  ",details);


  return (
    <div>

    {details.show?<div className="show">
    <h1>Name: {details.Fname} {details.Lname}</h1>
    <h2>Enclosure: {details.Category}</h2>
    <h2>Tournament : {details.TournamentName} {details.Lname}</h2>
    <h2>Match: {details.team1} vs {details.team2} </h2>
    <h2>City: {details.location}</h2>
    <h2>Stadium: {details.venue_name}</h2>
  </div>:
    <Ticket match_id = {params.params.tickets}/>
  }
    </div>
  );
}
