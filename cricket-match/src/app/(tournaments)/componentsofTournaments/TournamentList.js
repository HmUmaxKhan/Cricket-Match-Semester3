"use client"
import { useEffect, useState } from "react";
import TournamentListItems from "./TournamentListItems";
import Navbar from "@/app/(shared components)/Navbar";
import Loader from "@/app/(spinner)/Loader";

export default function TournamentList() {

    const [tournamentList, setTournaments] = useState([])
    const [img,SetImg] = useState();
    const [loading,setLoading] = useState(true)

        
    useEffect(()=>{

        const list = async () =>{
            let detail = localStorage.getItem("login");
            detail = JSON.parse(detail);
            console.log(detail);
            SetImg(detail.img);

            let response = await fetch("http://localhost:5005/api/tournament");
            response = await response.json();
            console.log(response.result);
            setTournaments(response.result);
            setLoading(false);
        }
        list();    
    },[])

  return (
    <div>
    {loading?(<Loader />):(
    <div>
    <Navbar val={true} img = {img}/>
    <h1 className="text-center m-3">List of Tournaments</h1>
    <p className="text-center m-3">Now you can select your favourite tournament</p>
    {
        Array.isArray(tournamentList) && tournamentList.map((item, index) => {
            return(
                {key : index},
                <TournamentListItems tournament = {item} />
            )
        })
    }
    </div>)}
    </div>

  )
}
