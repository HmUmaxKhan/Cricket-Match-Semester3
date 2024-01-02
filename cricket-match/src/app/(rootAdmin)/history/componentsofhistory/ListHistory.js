"use client"
import { useEffect, useState } from "react";
import ListItemsHistory from "./ListItemsHistory";

function ListHistory() {

    const [histories,Sethistories] = useState([]);

  useEffect(() => {
    //Getting the previous info

    let details = localStorage.getItem("rootLogin");
    if (!details && details === null) {
      window.location.href = "/rootadminlogin";
    }
    details = JSON.parse(details);

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/history", {
        method: "GET",
      });

      response = await response.json();
      console.log(response);
      Sethistories(response);
    };

    info();
  }, []);


  return <div className="row">
  {
    Array.isArray(histories) ? histories.map((item, index) => {
        return(
            {key : index},
            <ListItemsHistory history = {item} />
        )
    }):(<h2 className="text-center mb-3">No Histor available</h2>)
}
    </div>;
}

export default ListHistory;
