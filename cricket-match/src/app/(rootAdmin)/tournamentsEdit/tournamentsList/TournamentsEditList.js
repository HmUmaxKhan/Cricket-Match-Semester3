"use client"
import { useEffect, useState } from "react";
import TournamentsEditListItems from "../tournamentsListItems/TournamentsEditListItems";

function TournamentsEditList() {

    const [tournaments,Settournaments] = useState([]);
    const [render,setRender] = useState(false)
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
  }, [render]);


  const handleDelete=(tournament_id)=>{
    setRender(true)
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
