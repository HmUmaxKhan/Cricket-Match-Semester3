"use client"
import { useEffect, useState } from "react";
import TournamentsEditListItems from "../tournamentsListItems/TournamentsEditListItems";

function TournamentsEditList() {

    const [tournaments,Settournaments] = useState([]);
  useEffect(() => {
    //Getting the previous info

    let details = localStorage.getItem("adminLogin");
    if (!details && details === null) {
      window.location.href = "/hotelloginAdmin";
    }
    details = JSON.parse(details);

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/gettournaments", {
        method: "GET",
      });

      response = await response.json();
      console.log(response);
      Settournaments(response);
    };

    info();
  }, []);


  const handleDelete=(tournament_id)=>{
    Settournaments((prevtournaments)=>{
      prevtournaments.filter((tournament)=>tournament.tournament_id!=tournament_id)
    })
  }
  

  return <div>
  {
    Array.isArray(tournaments) ? tournaments.map((item, index) => {
        return(
            {key : index},
            <TournamentsEditListItems tournament = {item}  onDelete={handleDelete}/>
        )
    }):(<h2 className="text-center mb-3">No Tournaments are added</h2>)
}
    </div>;
}

export default TournamentsEditList;
