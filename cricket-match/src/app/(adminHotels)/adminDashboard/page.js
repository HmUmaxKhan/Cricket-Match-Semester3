"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import HotelsLists from './AllHotels/HotelsLists';

function page() {

  useEffect(()=>{
    let details = localStorage.getItem("adminLogin");

    if (!details) {
      window.location.href="/hotelloginAdmin"
    }

  })
  return (
    <div>
      <Link href="/hotelreg">Register Hostel</Link>
      <h1>Welcome to Hotel Management System!</h1>
      <HotelsLists />
    </div>
  )
}

export default page