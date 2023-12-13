import { useEffect, useState } from "react";
import HotelListItems from "./HostelListItems";

function HotelsLists() {

    const [hotel,setHotel] = useState({});
  useEffect(() => {
    //Getting the previous info

    let details = localStorage.getItem("adminLogin");
    if (!details && details === null) {
      window.location.href = "/hotelloginAdmin";
    }
    details = JSON.parse(details);

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/allhotelinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: details.user_id }),
      });
      response = await response.json();
      console.log(response);
      setHotel(response.result);
    };

    info();
  }, []);

  return <div>
  {
    Array.isArray(hotel) && hotel.map((item, index) => {
        return(
            {key : index},
            <HotelListItems hotel = {item} />
        )
    })
}
    </div>;
}

export default HotelsLists;
