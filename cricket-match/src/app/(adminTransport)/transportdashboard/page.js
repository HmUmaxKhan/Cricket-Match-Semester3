"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ListofTransport from './components of transport/ListofTransport';
import { useSelector } from 'react-redux';
import Loader from '@/app/(spinner)/Loader';



function page() {

  const router = useRouter();
  const packageId = useSelector((state)=>state.pricingCategory.package_id);
  
  const [loading,setLoading] = useState(true)

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }


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

      let pkg_id = localStorage.getItem("packageBus_id");
      pkg_id = JSON.parse(pkg_id);

       if(response===0){ 
        if (pkg_id==null) {
          router.push("/pricingbus")
        }else{  
       window.location.href='/paymenttransport'
        }
      }
      setLoading(false)
    }

    getBlock();
  })

  return (
    <div style={background}>
    {loading?(<Loader />):(
      <div>
      <h1 className="text-center">Transport Management</h1>
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
    )}
    </div>
  )
}

export default page