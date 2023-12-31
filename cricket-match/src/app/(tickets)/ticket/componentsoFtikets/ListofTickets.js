"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/(shared components)/Navbar";
import ListItemsofTickets from "./ListItemsofTickets";

export default function TransportList(props) {
  const [tickets, setTickets] = useState([]);
  const [img, SetImg] = useState();
  const [userId, SetUserId] = useState();

  console.log(props.matchId);

  useEffect(() => {
    const list = async () => {
      let detail = localStorage.getItem("login");
      detail = JSON.parse(detail);
      console.log(detail);
      SetImg(detail.img);
      SetUserId(detail.user_id)
    };
    list();

    const lists = async () => {
      let response = await fetch("http://localhost:5005/api/tickets", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          match_id: props.matchId,
        }),
      });
      response = await response.json();
      console.log(response.result);
      setTickets(response.result);
    };
    lists();

  }, []);

  console.log(userId);

  return (
    <div>
      <Navbar val={true} img={img} />
      <h1 className="text-center m-3 mt-4">List of Hotels</h1>
      {Array.isArray(tickets) && tickets.length !== 0 ? (
        tickets.map((item, index) => {
          return { key: index }, (<ListItemsofTickets ticket={item} matchId = {props.matchId} userId={userId} />);
        })
      ) : (
        <h3 className="text-center">No Tickets are there</h3>
      )}
    </div>
  );
}