"use client"
import { useEffect, useState } from "react";
import MatchesListItems from "./MatchesListItems";


export default function MatchesList(props){

    const [matchesList, setMatches] = useState([])

    useEffect(()=>{

        const list = async () =>{
            let response = await fetch("http://localhost:5005/api/matches",{
                method:'POST',
                headers:{
                  "content-type":"application/json"
                },
                body:JSON.stringify({
                    match: props.matches
                })
              });
              response = await response.json();
              console.log(response.result);
              setMatches(response.result);  
            };
        list();    
},[])

// const matchesList2 =[
//     {name:"match1"},
//     {name:"match2"}
// ]
      

  return (
    <div>
    {
        Array.isArray(matchesList) && matchesList.map((item, index) => {
            return(
                {key : index},
                <MatchesListItems match = {item} />
            )
        })
    }
    </div>
  )
}
