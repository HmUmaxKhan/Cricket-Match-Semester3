"use client"
import { useEffect, useState } from "react";
import RouteListItems from "./RouteListItems";

function RouteList(props) {

    const [routes,setRoutes] = useState([]);
    const [render,setRender] = useState(false)
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
    };

    setRender(false);

    info();
  }, [render]);


  const handleDelete=()=>{
    setRender(true)
  }
  

  return <div className="row">
  {
    Array.isArray(routes) ? routes.map((item, index) => {
        return(
            {key : index},
            <RouteListItems route = {item}  onDelete={handleDelete}/>
        )
    }):(<h2 className="text-center mb-3">No Routes are added</h2>)
}
    </div>;
}

export default RouteList;
