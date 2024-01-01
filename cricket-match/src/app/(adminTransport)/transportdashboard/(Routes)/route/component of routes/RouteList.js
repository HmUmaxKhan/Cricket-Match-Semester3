"use client"
import { useEffect, useState } from "react";
import RouteListItems from "./RouteListItems";
import Loader from "@/app/(spinner)/Loader";

function RouteList(props) {

    const [routes,setRoutes] = useState([]);
    const [render,setRender] = useState(false)
    const [loading,setLoading] = useState(true)

  useEffect(() => {

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/allrouteinfo", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({transport_id:props.transport_id})
      });

      response = await response.json();
      console.log(response);
      setRoutes(response);
      setLoading(false);
    };

    setRender(false);

    info();
  }, [render]);


  const handleDelete=()=>{
    setRender(true)
  }
  

  return(
    <div>
    {loading?(<Loader />):(
   <div className="row">
  {
    Array.isArray(routes) ? routes.map((item, index) => {
        return(
            {key : index},
            <RouteListItems route = {item}  onDelete={handleDelete}/>
        )
    }):(<h2 className="text-center mb-3">No Routes are added</h2>)
}
    </div>
    )}
    </div>
  )
}

export default RouteList;
