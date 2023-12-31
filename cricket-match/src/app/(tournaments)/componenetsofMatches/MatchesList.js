"use client";
import { useEffect, useState } from "react";
import MatchesListItems from "./MatchesListItems";
import Navbar from "@/app/(shared components)/Navbar";
import Loader from "@/app/(spinner)/Loader";

export default function MatchesList(props) {
  const [matchesList, setMatches] = useState([]);
  const [img, SetImg] = useState();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const list = async () => {
      let detail = localStorage.getItem("login");
      detail = JSON.parse(detail);
      console.log(detail);
      SetImg(detail.img);
    };
    list();

    const lists = async () => {
      let response = await fetch("http://localhost:5005/api/matches", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          match: props.matches,
        }),
      });
      response = await response.json();
      console.log(response.result);
      setMatches(response.result);
      setLoading(false);
    };
    lists();

    
  }, []);

  return (
    <div>
    {loading ? (<Loader />):(
    <div>
    <Navbar val={true} img = {img}/>
    <h1 className="text-center m-3 mt-4">List of Matches</h1>
    <p className="text-center m-3">Now you can select your favourite matches</p>
      {Array.isArray(matchesList) &&
        matchesList.map((item, index) => {
          return { key: index }, (<MatchesListItems match={item} />);
        })}
    </div>)}
    </div>
  );
}
