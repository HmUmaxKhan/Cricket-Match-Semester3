"use client"

import styles from   "./login.module.css"
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import NavBar from "../components/shared/NavBar/NavBar";

function Login() {


  const [login, setLogin] = useState({
    Username:"",
    Password:""
  })

  const Change = (e)=>{
     setLogin({...login,[e.target.name]:e.target.value})
  }

  const handleClick =async (e) =>{
    e.preventDefault();
    console.log(login);
    let response = await fetch("http://localhost:5005/api/auth/login",{
      method:'post',
      headers:{
        'content-type':'application/json', 
      },
      body:JSON.stringify({
        Username : login.Username ,
        Password: login.Password
      })
    });
    response = await response.json();

    console.log(response);

    if (response.token) {
      localStorage.setItem("login",JSON.stringify(response));
      window.location.href="/";
      
    }
  }

  return (
    <div>
      <NavBar />
    <div className='container flex justify-center items-center'  style={{height:"100vh"}}> 
    <div className="form-floating mb-3 ">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="Username" onChange={Change} />
  <label htmlFor="floatingInput" className={styles.main}>Email address</label>
</div>
<br></br>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="Password" onChange={Change}/>
  <label htmlFor="floatingPassword" >Password</label>
</div>
<br></br>
<button className=' text-center bg-slate-400' onClick={handleClick}>Submit</button>
<Link href={"/register"}> Registration</Link>
    </div>
    </div>
  )
}

export default Login