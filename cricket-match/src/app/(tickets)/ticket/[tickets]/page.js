"use client"
import { useEffect, useState } from "react";

export default function page(params) {
  
  const [selectedOption, setSelectedOption] = useState();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  console.log(selectedOption);

  const [details ,setDetails] = useState({})

  const [ticket, setTicket] = useState({})

 
  useEffect(()=>{

    let info = localStorage.getItem("login");
    if (!info){
      window.location.href="/login"
    }
    info = JSON.parse(info)
    setDetails(info);
  },[])

  const handleSubmit = async(e) =>{
    e.preventDefault();
  try {
    let response = await fetch("http://localhost:5005/api/tickets",{
      method:'POST',
      headers:{
        "content-type":"application/json",
        "auth-token":details.token
      },
      body:JSON.stringify({
            match_id:params.params.tickets,
            Category:selectedOption,
      })
    });

    response = await response.json();

    console.log(response);
    setTicket(response);
    console.log("Best prac",ticket);
  } 
  catch (error) {
    console.log("Error is ",error); 
  }

 }

    return (
      <div>
      Hello WORLD {params.params.tickets}
      <form onSubmit={handleSubmit}>
      <input
              type="radio"
              id="premium"
              name="fav_language"
              value='Premium'
              onChange={handleOptionChange}
            />
            <label htmlFor="premium">Premium</label><br></br>
      
            <input
              type="radio"
              id="vip"
              name="fav_language"
              value="VIP"
              onChange={handleOptionChange}
            />
            <label htmlFor="vip">VIP</label><br />
      
            <input
              type="radio"
              id="regular"
              name="fav_language"
              value="Regular"
              onChange={handleOptionChange}
            />
            <label htmlFor="regular">Regular</label>
            <br></br>
            <button  type="submit" >Submit</button>
            </form>
          </div>
        );

  
  
}
