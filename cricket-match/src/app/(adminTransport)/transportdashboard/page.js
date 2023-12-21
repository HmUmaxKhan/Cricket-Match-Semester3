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

    console.log(details);

    if (details.usertype!=='transportadmin') {
      router.push("/paymenttransport")
    }

    if(details.blocked===0) {
      router.push("/paymenttransport")
    }

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