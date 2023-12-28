"use client"

import styles from "./login.module.css";
import { useState } from "react";
import Link from "next/link";

function Login() {
  const [login, setLogin] = useState({
    UserName: "",
    Password: "",
  });

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    height:'100vh',
    width:'100%'
  }


  const cardStyle = {
    boxShadow: "0 0 10px 8px rgba(0,0,0,0.01)",
  };

  const Change = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/api/hotelloginadmin", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: login.UserName,
          Password: login.Password,
        }),
      });

      // Log raw response for troubleshooting
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      if(responseData.Msg==='Invalid Password'){
        return
      }

      if (responseData.Msg=='User with this username is not exits') {
        return
      }

      if (responseData.success) {
        localStorage.setItem("adminLogin", JSON.stringify(responseData));
        window.location.href = "/adminDashboard";
      } else {
        console.error("Login failed. No token in the response.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div style={background}>
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
      <div className="card p-4" style={cardStyle}>
        <h3 className=" py-3 text-center">
        Hotel Admin Login
        </h3>

        <div className="mb-3">
          <label htmlFor="Fname" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="Fname"
            placeholder="Enter your username"
            name="UserName"
            onChange={Change}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Lname" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Lname"
            placeholder="Enter your password"
            name="Password"
            onChange={Change}
          />
        </div>

        <button type="button" className="btn btn-success" onClick={handleClick}>
          Submit
        </button>

        <Link href="/registerAdmin" className="link  mt-3">
          SignUp
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Login;

