"use client"
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const page = ({params}) => {

  const [tournament_id,setTournamentId] = useState();

  const cardStyle={
    boxShadow:"0 0 10px 8px"
  }

  console.log(params.updatepackages);

  useEffect(()=>{
    //Getting the previous info
        const info = async()=>{
        let response = await fetch("http://localhost:5005/api/getsinglepackage",{
            method:'POST',
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({package_id:params.updatepackages})
          });
          response = await response.json();
          console.log(response);

          const { DurationInDays,packageName,packageFee,AddingDate } = response;

          setReg({
            DurationInDays,
            packageName,
            packageFee,
            });

    }

    info();
    },[]);

  const [reg, setReg] = useState({

    DurationInDays:"",
    packageName:"",
    packageFee:"",
    });

  const Change = (e)=>{
    setReg({...reg,[e.target.name]:e.target.value})
  }

  const handleClick =async (e) =>{
    e.preventDefault();
    const modifiedadd = new Date();
    modifiedadd.setDate(modifiedadd.getDate()+1);  
    let response = await fetch("http://localhost:5005/api/updatepackages",{
      method:'PUT',
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        package_id:params.updatepackages,
        DurationInDays : reg.DurationInDays,
        packageName:reg.packageName,
        packageFee:reg.packageFee,
        AddingDate: modifiedadd.toISOString().slice(0,10)
      }),
    });
    response = await response.json();
    console.log(response);
    window.location.href=`/packages`
  }

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
          <div className="card p-4"  style={cardStyle}>
            <h3 className=" py-3 text-center">Update the Package</h3>
            <div className="mb-3">
              <label htmlFor="Fname" className="form-label">
                Duration IN Days
              </label>
              <input
                type="number"
                className="form-control"
                id="Fname"
                placeholder="Enter your first name"
                name="DurationInDays"
                onChange={Change}
                value={reg.DurationInDays}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="Lname" className="form-label">
                Package Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Lname"
                placeholder="Enter your last name"
                name="packageName"
                value={reg.packageName}
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                Package Fee
              </label>
              <input
                type="text"
                className="form-control"
                id="UserName"
                placeholder="Choose a username"
                name="packageFee"
                value={reg.packageFee}
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