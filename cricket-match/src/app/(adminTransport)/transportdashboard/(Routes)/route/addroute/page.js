"use client"
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from "react-redux";


const page = () => {


  const router = useRouter()
  const [user_id,setUserId] = useState();
  const cardStyle={
    boxShadow:"0 0 10px 8px"
  }

  useEffect(()=>{
    let details = localStorage.getItem("rootLogin");
    details = JSON.parse(details);
    console.log(details.user_id);
    setUserId(details.user_id)
  },[])

  const [reg, setReg] = useState({
    stop:"",
    arrival_time:"",
    fare:"",
    stop_number:"",
    });

  const Change = (e)=>{
    setReg({...reg,[e.target.name]:e.target.value})
  }

  const transport_id = useSelector((state)=>state.transportId.transport_id)


  const handleClick =async (e) =>{
    e.preventDefault();

    console.log(transport_id);
    
    let response = await fetch("http://localhost:5005/api/addroute",{
      method:'POST',
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        transport_id:transport_id,
        stop:reg.stop,
        arrival_time:reg.arrival_time,
        fare:reg.fare,
        stop_number:reg.stop_number,
        user_id:user_id
      }),
    });
    response = await response.json();
    console.log(response);
    router.back();
  }

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
          <div className="card p-4"  style={cardStyle}>
            <h3 className=" py-3 text-center">Add route details </h3>
            <div className="mb-3">
              <label htmlFor="Fname" className="form-label">
                Stop Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Fname"
                placeholder="Enter Stop Name"
                name="stop"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
            <label htmlFor="Fname" className="form-label">
            Arrival TIme
          </label>
          <input
            type="time"
            className="form-control"
            id="Fname"
            placeholder="Enter Arrival Time"
            name="arrival_time"
            onChange={Change}
          />
            </div>
    
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                Fare From This Stop
              </label>
              <input
                type="number"
                className="form-control"
                id="UserName"
                placeholder="Ente rhte Fare"
                name="fare"
                min="100"
                onChange={Change}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                Stop Number 
              </label>
              <input
                type="number"
                className="form-control"
                id="UserName"
                placeholder="Ente rhte Fare"
                name="stop_number"
                min="1"
                onChange={Change}
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleClick}>
              Submit
            </button>
          </div>
        </div>
  );

}
 
export default page;