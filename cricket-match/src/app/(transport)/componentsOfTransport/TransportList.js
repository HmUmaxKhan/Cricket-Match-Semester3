"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/(shared components)/Navbar";
import TransportListItems from "./TransportListItems";

export default function TransportList(props) {
  const [transports, setTransport] = useState([]);
  const [img, SetImg] = useState();

  console.log(props.matchId);

  useEffect(() => {
    const list = async () => {
      let detail = localStorage.getItem("login");
      detail = JSON.parse(detail);
      console.log(detail);
      SetImg(detail.img);
    };
    list();

    const lists = async () => {
      let response = await fetch("http://localhost:5005/api/transportusers", {
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
      setTransport(response.result);
    };
    lists();
  }, []);

  return (
    <div>
      <Navbar val={true} img={img} />
      <h1 className="text-center m-3 mt-4">List of Hotels</h1>
      {Array.isArray(transports) && transports.length !== 0 ? (
        transports.map((item, index) => {
          return { key: index }, (<TransportListItems transport={item} />);
        })
      ) : (
        <h3>No Transport are there in this city</h3>
      )}
    </div>
  );
}
