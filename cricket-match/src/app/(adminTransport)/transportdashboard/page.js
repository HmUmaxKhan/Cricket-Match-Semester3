"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import ListofTransport from './components of transport/ListofTransport';



function page() {

  const router = useRouter();
  useEffect(()=>{

    let details = localStorage.getItem("adminTransLogin");

    if (!details) {
      router.push("/paymenttransport");
    }

    details = JSON.parse(details);

    console.log(details.admin_id);

    if (details.usertype!=='transportadmin') {
      console.log("no usertype");
      router.push("/transportreg")
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
        router.push("/paymenttransport");
      }
    }

    getBlock();
  })

  return (
    <div>
      <h1 className="text-center mt-3">Transport Management</h1>
      <Link
        className="text-center btn btn-primary"
        style={{
          margin: "20px 0 40px 0",
          display: "flex",
          justifyContent: "center",
        }}
        href="/transportregbus"
      >
        Add Transport
      </Link>
      <ListofTransport />
    </div>
  )
}

export default page