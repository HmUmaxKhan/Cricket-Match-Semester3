"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HotelsLists from "./AllHotels/HotelsLists";
import { useRouter } from "next/navigation";
import Loader from "@/app/(spinner)/Loader";

function page() {

  const router = useRouter();

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  const [loading,setLoading] = useState(true)

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

      let pkg_id = localStorage.getItem("packageHotel_id");
      pkg_id = JSON.parse(pkg_id);

      if(response===0){ 
        if (pkg_id==null) {
          router.push("/pricinghotel")
        }else{  
       window.location.href='/paymenthotel'
        }
      }
      setLoading(false)
    }

    getBlock();
  });
  
  return (
    <div style={background}>
    {loading?(<Loader />):(
      <div>
      <h1 className="text-center">Hotel Management</h1>
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
      )}
    </div>
  );
}

export default page;
