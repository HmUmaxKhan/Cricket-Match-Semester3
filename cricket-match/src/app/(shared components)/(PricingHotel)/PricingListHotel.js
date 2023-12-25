"use client"
import { useEffect, useState } from "react";
import PricingListItemsHotel from "./PricingListItemsHotel";

function PricingListHotel() {

    const [Packages,setPackages] = useState({});
  useEffect(() => {
    //Getting the previous info

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/gethotels", {
        method: "GET"
      });

      response = await response.json();
      console.log(response);
      setPackages(response);
    };

    info();
  }, []);


  return(
  <div className="container">
  <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h1 class="display-4 fw-normal text-body-emphasis">Pricing Plans</h1>
    </div>
  <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
  {
    Array.isArray(Packages) && Packages.map((item, index) => {

        return(
            {key : index},
            <PricingListItemsHotel packages = {item}/>
        )
    })
}
    </div>;
    </div>)
}

export default PricingListHotel;
