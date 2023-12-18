"use client"
import { useEffect, useState } from "react";
import MatchEditListItems from "../MatchListItems/MatchEditListItems";

function MatchesEditList(props) {

    const [matches,Setmatches] = useState([]);
    const [render,setRender] = useState(false)
  useEffect(() => {

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/getMatches", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({tournament_id:props.t_id})
      });

      response = await response.json();
      console.log(response);
      Setmatches(response);
    };

    setRender(false);

    info();
  }, [render]);


  const handleDelete=(tournament_id)=>{
    setRender(true)
  }
  

  return <div>
  {
    Array.isArray(matches) ? matches.map((item, index) => {
        return(
            {key : index},
            <MatchEditListItems match = {item}  onDelete={handleDelete}/>
        )
    }):(<h2 className="text-center mb-3">No Matches are here</h2>)
}
    </div>;
}

export default MatchesEditList;
