"use client"
import { useEffect, useState } from "react";
import TicketEditListItems from "./TicketEditListItem";

function TicketEditList(props) {

    const [tickets,Settickets] = useState([]);
    const [render,setRender] = useState(false)
  useEffect(() => {

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/gettickets", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({match_id:props.match_id})
      });

      response = await response.json();
      console.log(response);
      Settickets(response);
    };

    setRender(false);

    info();
  }, [render]);


  const handleDelete=()=>{
    setRender(true)
  }
  

  return <div className="row">
  {
    Array.isArray(tickets) ? tickets.map((item, index) => {
        return(
            {key : index},
            <TicketEditListItems ticket = {item}  onDelete={handleDelete}/>
        )
    }):(<h2 className="text-center mb-3">No Tickets are here</h2>)
}
    </div>;
}

export default TicketEditList;
