"use client"

import { useState } from "react";

function Login() {

  const [reg, setReg] = useState({
    Email:"",
    FName:"",
    LName:"",
    Username:"",
    Password:"",
    Phone:""
  })

  const Change = (e)=>{
     setReg({...reg,[e.target.name]:e.target.value})
  }

  const handleClick =async (e) =>{
    e.preventDefault();
    console.log(reg);
    let response = await fetch("http://localhost:5005/api/auth/reg",{
      method:'POST',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
            Email:reg.Email,
            FName:reg.FName,
            LName:reg.LName,
            Username:reg.Username,
            Password:reg.Password,
            Phone:reg.Phone
      })
    });
    response = await response.json();
    console.log(response.token);
  }

  return (
    <div className='container flex justify-center items-center'  style={{height:"100vh"}}> 

    <div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="FName" onChange={Change} />
  <label htmlFor="floatingInput">First Name</label>
</div>
<br></br>

    <div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="LName" onChange={Change} />
  <label htmlFor="floatingInput">Last Name</label>
</div>
<br></br>


    <div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Username" onChange={Change} />
  <label htmlFor="floatingInput">Username</label>
</div>
<br></br>

<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="Password" onChange={Change}/>
  <label htmlFor="floatingPassword" >Password</label>
</div>
<br></br>

<div className="form-floating mb-3 ">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="Email" onChange={Change} />
  <label htmlFor="floatingInput">Email address</label>
</div>
<br></br>


<div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Phone" onChange={Change} />
  <label htmlFor="floatingInput">Phone</label>
</div>
<br></br>

<button className=' text-center bg-slate-400' onClick={handleClick}>Submit</button>
    </div>

  )
}

export default Login