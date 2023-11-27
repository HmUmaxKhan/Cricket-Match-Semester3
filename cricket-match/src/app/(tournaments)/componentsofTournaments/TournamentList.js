"use client"
import { useEffect, useState } from "react";
import TournamentListItems from "./TournamentListItems";

export default function TournamentList() {

    const [tournamentList, setTournaments] = useState([])

    useEffect(()=>{

        const list = async () =>{
            let response = await fetch("http://localhost:5005/api/tournament");
            response = await response.json();
            console.log(response.result);
            setTournaments(response.result);
        }
        list();    
    },[])
      

  return (
    <div>
    {
        Array.isArray(tournamentList) && tournamentList.map((item, index) => {
            return(
                {key : index},
                <TournamentListItems tournament = {item} />
            )
        })
    }
    </div>
  )
}
