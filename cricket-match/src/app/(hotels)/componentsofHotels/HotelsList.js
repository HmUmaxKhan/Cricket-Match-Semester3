"use client"
import { useEffect, useState } from "react";
import HotelListItems from "./HotelListItems";
import Navbar from "@/app/(shared components)/Navbar";


export default function HotelsList(props){

    const [hotelsList, setHotels] = useState([])
    const [img, SetImg] = useState();
    const [loading,SetLoading] = useState(true);

    console.log(props.hotels);

    useEffect(()=>{

      const list = async () => {
        let detail = localStorage.getItem("login");
        detail = JSON.parse(detail);
        console.log(detail);
        SetImg(detail.img);
      };
      list();
  

        const lists = async () =>{
            let response = await fetch("http://localhost:5005/api/hotels",{
                method:'POST',
                headers:{
                  "content-type":"application/json",
                },
                body:JSON.stringify({
                    match_id: props.hotels
                })
              });
              response = await response.json();
              console.log(response.result);
              setHotels(response.result);  
              SetLoading(false)
            };
        lists();    
},[])  

  return (
    <div>
    {loading?(<Loader />):(
      <div>
      <Navbar val={true} img = {img}/>
    <h1 className="text-center m-3 mt-4">List of Hotels</h1>
    {
        Array.isArray(hotelsList) && hotelsList.length!==0 ? hotelsList.map((item, index) => {
            return(
                {key : index},
                <HotelListItems hotel = {item} />
            )
        }):(<h3>No hotels are there in this city</h3>)
    }
    </div>)}
    </div>
  )
}
