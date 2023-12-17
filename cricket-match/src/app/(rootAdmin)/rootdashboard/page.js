"use client"
import Link from "next/link"
import { useEffect } from "react"

function page() {

  useEffect(()=>{
    let details = localStorage.getItem("rootLogin")

    if (!details) {
      window.location.href="rootadminlogin"
    }

    details = JSON.parse(details);

    if (details.usertype!="rootadmin") {
      window.location.href="rootadminlogin"
    }

    console.log(details);
  })

  return (
    <div>
        <h1>Root Login</h1>
        <Link href="/tournamentsEdit">Tournaments</Link>
    </div>
  )
}

export default page