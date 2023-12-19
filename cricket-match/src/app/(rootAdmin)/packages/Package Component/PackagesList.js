"use client"
import { useEffect, useState } from "react";
import PackageListItems from "./PackageListItems";

function PackagesList() {

    const [packages,Setpackages] = useState([]);
    const [render,setRender] = useState(false)
  useEffect(() => {
    //Getting the previous info

    let details = localStorage.getItem("rootLogin");
    if (!details && details === null) {
      window.location.href = "/rootadminlogin";
    }
    details = JSON.parse(details);

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/getpackages", {
        method: "GET",
      });

      response = await response.json();
      console.log(response);
      Setpackages(response);
    };

    setRender(false);

    info();
  }, [render]);


  const handleDelete=()=>{
    setRender(true)
  }
  

  return <div className="row">
  {
    Array.isArray(packages) ? packages.map((item, index) => {
        return(
            {key : index},
            <PackageListItems packages = {item}  onDelete={handleDelete}/>
        )
    }):(<h2 className="text-center mb-3">No Tournaments are added</h2>)
}
    </div>;
}

export default PackagesList;
