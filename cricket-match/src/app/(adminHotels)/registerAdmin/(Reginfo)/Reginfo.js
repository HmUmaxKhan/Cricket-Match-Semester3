    "use client"
import React from 'react';
import "./Reginfo.css"
import Link from "next/link";
    import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
    
    function Reginfo() {

        const [cnfrm,setCnfrm] = useState();
        const dispatch = useDispatch();

        const cardStyle={
          boxShadow:"0 0 10px 8px"
        }

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
        <div className="container d-flex justify-content-center align-items-center flex-column p-5">
          <div className="card p-4"  style={cardStyle}>
            <h3 className=" py-3 text-center">Registration Information for Hostel Admin</h3>
    
            <div className="mb-3">
              <label htmlFor="Fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Fname"
                placeholder="Enter your first name"
                name="Fname"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="Lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Lname"
                placeholder="Enter your last name"
                name="Lname"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="UserName"
                placeholder="Choose a username"
                name="UserName"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="Password"
                placeholder="Enter your password"
                name="Password"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="EmailAddress" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="EmailAddress"
                placeholder="name@example.com"
                name="EmailAddress"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="Contact" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="Contact"
                placeholder="Enter your phone number"
                name="Contact"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="CNIC" className="form-label">
                CNIC
              </label>
              <input
                type="text"
                className="form-control"
                id="CNIC"
                placeholder="Enter your CNIC"
                name="CNIC"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="Address"
                placeholder="Enter your address"
                name="Address"
                onChange={Change}
              />
            </div>
    
            <button type="button" className="btn btn-success" onClick={handleClick}>
              Submit
            </button>
    
            <Link href="/paymentHotel" className="link  mt-3">
              Hotel Payment
            </Link>
          </div>
        </div>
      );
    }
    
    export default Reginfo