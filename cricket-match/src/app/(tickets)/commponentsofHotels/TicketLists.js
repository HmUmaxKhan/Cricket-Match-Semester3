import { ticketInfo, ticketInfoReducer } from "@/app/redux/slice/ticketSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
function TicketLists(props) {

  const{ match_id,Category,price,token} = props

  const dispatch = useDispatch();

  console.log(match_id,Category,token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5005/api/tickets", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          match_id: match_id,
          Category: Category,
        }),
      });

      response = await response.json();
      response.details.show=true
      dispatch(ticketInfoReducer(response.details));
      
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  return (
    <div>
       <button onClick={handleSubmit} type="submit">{Category} {price}</button>
    </div>
  );
}

export default TicketLists;
