"use client"
import { useEffect, useState } from "react";
import Navbar from "@/app/(shared components)/Navbar";
import ListItemsRoute from "./ListItemsRoute";
import Loader from "@/app/(spinner)/Loader";


export default function HotelsList(props){

    const [routes, setRoute] = useState([])
    const [img, SetImg] = useState();
    const [loading,SetLoading] = useState(true);

    console.log(props.transportId);

    useEffect(()=>{

      const list = async () => {
        let detail = localStorage.getItem("login");
        detail = JSON.parse(detail);
        console.log(detail);
        SetImg(detail.img);
      };
      list();
  

        const lists = async () =>{
            let response = await fetch("http://localhost:5005/api/routes",{
                method:'POST',
                headers:{
                  "content-type":"application/json",
                },
                body:JSON.stringify({
                    transport_id: props.transportId
                })
              });
              response = await response.json();
              console.log(response);
              setRoute(response);  
              SetLoading(false);
            };
        lists();    
},[])  

  return (
    <div>
    {loading?(<Loader />):(
    <div>
    <Navbar val={true} img = {img}/>
    <h1 className="text-center m-3 mt-4">List of Routes</h1>
    {
        Array.isArray(routes) && routes.length!==0 ? routes.map((item, index) => {
            return(
                {key : index},
                <ListItemsRoute route = {item} />
            )
        }):(<h3 className="text-center">No Routes are there in this city</h3>)
    }
    </div>)}
    </div>
  )
}
