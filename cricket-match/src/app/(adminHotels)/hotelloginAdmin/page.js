"use client"

import styles from "./login.module.css";
import { useState } from "react";
import Link from "next/link";

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

      if (responseData) {
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
    <div>
      <h1>Login Admins</h1>
      <div
        className={`container flex justify-center items-center ${styles.loginContainer}`}
        style={{ height: "100vh" }}
      >
        <div className={`form-floating mb-3 ${styles.formElement}`}>
          <input
            type="email"
            className={`form-control ${styles.input}`}
            id="floatingInput"
            placeholder="name@example.com"
            name="UserName"
            onChange={Change}
          />
          <label htmlFor="floatingInput" className={`${styles.label} ${styles.main}`}>
            Username
          </label>
        </div>
        <br />
        <div className={`form-floating ${styles.formElement}`}>
          <input
            type="password"
            className={`form-control ${styles.input}`}
            id="floatingPassword"
            placeholder="Password"
            name="Password"
            onChange={Change}
          />
          <label htmlFor="floatingPassword" className={styles.label}>
            Password
          </label>
        </div>
        <br />
        <button
          className={`text-center ${styles.button}`}
          onClick={handleClick}
        >
          Submit
        </button>
        <Link href="/registerAdmin"> Registration</Link>
      </div>
    </div>
  );
}

export default Login;

