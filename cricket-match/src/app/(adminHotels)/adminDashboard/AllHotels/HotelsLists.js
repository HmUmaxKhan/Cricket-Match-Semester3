import { useEffect, useState } from "react";
import HotelListItems from "./HostelListItems";

function HotelsLists() {

    const [hotel,setHotel] = useState({});
    const [render,setRender] = useState();
    const [userId,setUserId] = useState();
  useEffect(() => {
    //Getting the previous info

    let details = localStorage.getItem("adminLogin");
    if (!details || details === null) {
      window.location.href = "/hotelloginAdmin";
    }
    details = JSON.parse(details);

    console.log(details.admin_id[0].admin_id);

   

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/allhotelinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_id:details.admin_id[0].admin_id}),
      });
      response = await response.json();
      console.log(response);
      setHotel(response);
    };

    setRender(false);

    info();
  }, [render]);


  const handleDelete=(tournament_id)=>{
    setRender(true)
  }

  return <div>
  {
    Array.isArray(hotel) && hotel!=[] ? hotel.map((item, index) => {
        return(
            {key : index},
            <HotelListItems hotel = {item} onDelete={handleDelete}/>
        )
    }):<h3 className="text-center">No Hotels are here</h3>
}
    </div>;
}

export default HotelsLists;
