"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page() {
  const [login, setLogin] = useState({
    UserName: "",
    Password: "",
  });

  const router = useRouter();

  const cardStyle = {
    boxShadow: "0 0 10px 8px",
  };

  const Change = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/api/transportloginadmin", {
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
      console.log(login);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success) {
        localStorage.setItem("adminTransLogin", JSON.stringify(responseData));
        router.push("/transportdashboard");
      } else {
        console.error("Login failed. No token in the response.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
      <div className="card p-4" style={cardStyle}>
        <h3 className=" py-3 text-center">
        Transport Admin Login
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

        <Link href="/transportreg" className="link  mt-3">
          SignUp
        </Link>
      </div>
    </div>
  );
}

export default page;

