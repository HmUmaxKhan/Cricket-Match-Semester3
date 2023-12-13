    "use client"
import React from 'react';
import "./Reginfo.css"
import Link from "next/link";
    import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
    
    function Reginfo() {

        const [cnfrm,setCnfrm] = useState();
        const dispatch = useDispatch();

      const [reg, setReg] = useState({
        EmailAddress:"",
        Fname:"",
        Lname:"",
        UserName:"",
        Password:"",
        CNIC:"",
        Contact:""
      })
    
      const Change = (e)=>{
        setReg({...reg,[e.target.name]:e.target.value})
      }

      const handleClick =async (e) =>{
        e.preventDefault();
        let response = await fetch("http://localhost:5005/api//hotelregown",{
          method:'POST',
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({
                EmailAddress:reg.EmailAddress,
                Fname:reg.Fname,
                Lname:reg.Lname,
                UserName:reg.UserName,
                Password:reg.Password,
                Contact:reg.Contact,
                CNIC : reg.CNIC,
                Address:reg.Address,
                usertype:'hosteladmin'
          })
        });
        response = await response.json();
        localStorage.setItem("adminLogin",JSON.stringify(response));
       

        window.location.href="/paymenthotel"
        
      }
    
      return (
        <div className='container flex justify-center items-center flex-col'  style={{height:"100vh"}}> 
    
        <div className="form-floating mb-3 ">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Fname" onChange={Change} />
      <label htmlFor="floatingInput">First Name</label>
    </div>
    <br></br>
    
        <div className="form-floating mb-3 ">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Lname" onChange={Change} />
      <label htmlFor="floatingInput">Last Name</label>
    </div>
    <br></br>
    
    
        <div className="form-floating mb-3 ">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="UserName" onChange={Change} />
      <label htmlFor="floatingInput">Username</label>
    </div>
    <br></br>
    
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="Password" onChange={Change}/>
      <label htmlFor="floatingPassword" >Password</label>
    </div>
    <br></br>
    
    <div className="form-floating mb-3 ">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="EmailAddress" onChange={Change} />
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <br></br>
    
    
    <div className="form-floating mb-3 ">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Contact" onChange={Change} />
      <label htmlFor="floatingInput">Phone</label>
    </div>
    <br></br>
    
    <div className="form-floating mb-3 ">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="CNIC" onChange={Change} />
      <label htmlFor="floatingInput">Phone</label>
    </div>
    <br></br>
    
    <div className="form-floating mb-3 ">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Address" onChange={Change} />
      <label htmlFor="floatingInput">Phone</label>
    </div>
    <br></br>
    
    <button type="button" class="btn btn-success" className=' text-center bg-slate-400' onClick={handleClick}>Submit</button>

    <Link  class="link-warning" className="link right-align" href="/paymentHotel">Hotel Payment</Link>
        </div>
    
      )
    }
    
    export default Reginfo