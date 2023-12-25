"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import HotelsLists from "./AllHotels/HotelsLists";
import { useRouter } from "next/navigation";

function page() {

  const router = useRouter();

  useEffect(() => {
    let details = localStorage.getItem("adminLogin");

    details = JSON.parse(details);

    console.log(details);

    if (details.usertype!=='hosteladmin') {
      console.log("usertype is not hosteladmin");
      router.push("/registerAdmin")
    }

    if (!details) {
      router.push("/hotelloginAdmin");
    }

    const getBlock = async()=>{
      let response = await fetch ("http://localhost:5005/api/getblocked",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({admin_id:details.admin_id})
      });

      response =await response.json();

      console.log(response);

      if (response===0) {
       // router.push("/pricinghotel");
       window.location.href='/paymenthotel'
      }
    }

    getBlock();
  });
  
  return (
    <div>
      <h1 className="text-center mt-3">Hotel Management</h1>
      <Link
        className="text-center btn btn-primary"
        style={{
          margin: "20px 0 40px 0",
          display: "flex",
          justifyContent: "center",
        }}
        href="/hotelreg"
      >
        Add Hotel
      </Link>
      <HotelsLists />
    </div>
  );
}

export default page;
