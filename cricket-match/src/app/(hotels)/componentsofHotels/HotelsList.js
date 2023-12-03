"use client"
import { useEffect, useState } from "react";
import HotelListItems from "./HotelListItems";


export default function HotelsList(props){

    const [hotelsList, setHotels] = useState([])

    useEffect(()=>{

        const list = async () =>{
            let response = await fetch("http://localhost:5005/api/hotels",{
                method:'POST',
                headers:{
                  "content-type":"application/json",
                },
                body:JSON.stringify({
                    hotel: props.hotels
                })
              });
              response = await response.json();
              console.log(response.result);
              setHotels(response.result);  
            };
        list();    
},[])  

  return (
    <div>
    {
        Array.isArray(hotelsList) && hotelsList.map((item, index) => {
            return(
                {key : index},
                <HotelListItems hotel = {item} />
            )
        })
    }
    </div>
  )
}
