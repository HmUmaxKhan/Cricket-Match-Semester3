"use client"
import { useEffect, useState } from "react";

export default function page(params) {
  
  const [selectedOption, setSelectedOption] = useState([]);

  const handleOptionChange = (e) => {
    const selectedValue =e.target.value
    const selectedArray  = selectedValue.split(',') 
    setSelectedOption(selectedArray);
  };

  const [details ,setDetails] = useState({})

  const [ticket, setTicket] = useState({})

  console.log(details.token);
 
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
    let response = await fetch("http://localhost:5005/api/tickets",{
      method:'POST',
      headers:{
        "content-type":"application/json",
        "auth-token":details.token
      },
      body:JSON.stringify({
            match_id:params.params.tickets,
            Category:selectedOption[0],
            price:selectedOption[1]
      })
    });
    response = await response.json();
    setTicket({...response});
  }

  console.log("Best prac",ticket);
  console.log(selectedOption[0]);

    return (
      <div>
      Hello WORLD {params.params.tickets}
      <input
              type="radio"
              id="premium"
              name="fav_language"
              value={['Primary','5000'].join(',')}
              onChange={handleOptionChange}
            />
            <label htmlFor="primary">Premium</label><br></br>
      
            <input
              type="radio"
              id="vip"
              name="fav_language"
              value={["VIP","10000"]}
              onChange={handleOptionChange}
            />
            <label htmlFor="vip">VIP</label><br />
      
            <input
              type="radio"
              id="regular"
              name="fav_language"
              value={["Regular","2000"]}
              onChange={handleOptionChange}
            />
            <label htmlFor="regular">Regular</label>
            <br></br>
            <button onClick={()=>{handleSubmit}} >Submit</button>
          </div>
        );

  
  
}
