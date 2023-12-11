"use client";

import { adminId } from "@/app/redux/slice/registerAdmin";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Hotelreg() {
  const [adminId, setAdminId] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const details = async () => {
      let detail = localStorage.getItem("adminLogin");

      if (!detail) {
        window.location.href = "/registerAdmin";
      }
      detail = await JSON.parse(detail);
      console.log("detail-- ", detail);

      if (detail.admin_id && detail.admin_id.length > 0) {
        setAdminId(detail.admin_id[0].admin_id);
      }
    };

    details();
  }, []);

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    convertToBase64(file);
  }

  const convertToBase64 = (file) => {
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setImage(base64String);
    };
  
    // Ensure to read the file as data URL
    reader.readAsDataURL(file);
  };

  const [reg, setReg] = useState({
    Email: "",
    Name: "",
    City: "",
    PhoneNumber: "",
    Address: "",
    Description: "",
    RoomPrice: "",
    RoomCapacity: "",
    WebUrl: "",
  });

  const Change = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5005/api/hotelreg", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Email: reg.Email,
        Name: reg.Name,
        PhoneNumber: reg.PhoneNumber,
        City: reg.City,
        Address: reg.Address,
        RoomCapacity: reg.RoomCapacity,
        Description: reg.Description,
        RoomPrice: reg.RoomPrice,
        WebUrl: reg.WebUrl,
        admin_id: adminId,
        ImageUrl:image
      }),
    });
    response = await response.json();
    console.log(response);

    console.log(reg);
    console.log(adminId);
    console.log("image:",image);

    if (response.success) {
      window.location.href = "/adminDashboard";
    }
  };

  return (
    <div
      className="container flex justify-center items-center flex-col"
      style={{ height: "100vh" }}
    >
      <div className="form-floating mb-3 ">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          name="Name"
          onChange={Change}
        />
        <label htmlFor="floatingInput">Name of Hotel</label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          name="City"
          onChange={Change}
        />
        <label htmlFor="floatingInput">City</label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          name="Address"
          onChange={Change}
        />
        <label htmlFor="floatingInput">Address</label>
      </div>
      <br></br>

      <div className="form-floating">
        <input
          type="number"
          className="form-control"
          id="floatingPassword"
          name="PhoneNumber"
          onChange={Change}
        />
        <label htmlFor="floatingPassword">Phone Number</label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="Email"
          onChange={Change}
        />
        <label htmlFor="floatingInput">Email of Hotel</label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="Description"
          onChange={Change}
        />
        <label htmlFor="floatingInput">Description</label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="RoomCapacity"
          onChange={Change}
        />
        <label htmlFor="floatingInput">No. of Rooms</label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="Number"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="RoomPrice"
          onChange={Change}
        />
        <label htmlFor="floatingInput">Price </label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="WebUrl"
          onChange={Change}
        />
        <label htmlFor="floatingInput">Website Link </label>
      </div>
      <br></br>

      <div className="form-floating mb-3 ">
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleImageChange}
        />
        <label htmlFor="floatingInput">Website Link </label>
      </div>
      <br></br>

      <button className=" text-center bg-slate-400" onClick={handleClick}>
        Submit
      </button>

      <Link href="/paymenthotel">Hotel Payment</Link>
    </div>
  );
}

export default Hotelreg;
