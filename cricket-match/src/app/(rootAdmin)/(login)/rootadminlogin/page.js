"use client"

import { useState } from "react";


function Login() {
  const [login, setLogin] = useState({
    UserName: "",
    Password: "",
  });

  const Change = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/api/rootlogin", {
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

      if (responseData) {
        localStorage.setItem("rootLogin", JSON.stringify(responseData));
        window.location.href = "rootdashboard";
      } else {
        console.error("Login failed. No token in the response.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div>
      <div
        className={`container flex justify-center items-center `}
        style={{ height: "100vh" }}
      >
        <div className={`form-floating mb-3`}>
          <input
            type="email"
            className={`form-control `}
            id="floatingInput"
            placeholder="name@example.com"
            name="UserName"
            onChange={Change}
          />
          <label htmlFor="floatingInput">
            Email address
          </label>
        </div>
        <br />
        <div className={`form-floating`}>
          <input
            type="password"
            className={`form-control`}
            id="floatingPassword"
            placeholder="Password"
            name="Password"
            onChange={Change}
          />
          <label htmlFor="floatingPassword">
            Password
          </label>
        </div>
        <br />
        <button
          className={`text-center btn btn-primary`}
          onClick={handleClick}
        >
          Submit
        </button>
     </div>
    </div>
  );
}

export default Login;

