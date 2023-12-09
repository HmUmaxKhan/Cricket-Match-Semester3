"use client"
import React, { useEffect } from 'react'


function page() {

    useEffect(()=>{
        const details = localStorage.getItem("login");
        console.log(details);

        if (!details && details===null && details.usertype=="hosteladmin") {
            window.location.href="/loginAdmin"
        }
    })
  return (
    <div>
        <h1>Admins</h1>
    </div>
  )
}

export default page