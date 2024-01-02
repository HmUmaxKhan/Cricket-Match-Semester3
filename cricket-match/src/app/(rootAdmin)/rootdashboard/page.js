"use client"
import Link from "next/link"
import { useEffect } from "react"

function page() {

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }


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
    <div style={background}>
        <h1 className="text-center">Root Login</h1>
        <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"80px"}}>

        <Link className="btn btn-primary"  href="/tournamentsEdit">Tournaments</Link><br></br>
        <Link className="btn btn-primary" href="/packages">Packages</Link><br></br>
        <Link className="btn btn-primary" href="/history">History</Link>
        </div>
    </div>
  )
}

export default page