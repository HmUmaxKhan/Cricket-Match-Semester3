"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import HotelsLists from "./AllHotels/HotelsLists";

function page() {
  useEffect(() => {
    let details = localStorage.getItem("adminLogin");

    if (!details) {
      window.location.href = "/hotelloginAdmin";
    }
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
