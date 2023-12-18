"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


function Hotelreg() {
  const [adminId, setAdminId] = useState();
  const [image, setImage] = useState();
  const [addingDate,setAddingDate]=useState(new Date());

  useEffect(() => {
    const details = async () => {
      let detail = localStorage.getItem("adminLogin");

      if (!detail) {
        window.location.href = "/registerAdmin";
      }
      detail = await JSON.parse(detail);
      console.log("detail-- ", detail);

      if (detail.admin_id) {
        setAdminId(detail.admin_id);
      }
    };

    details();
    
  }, []);

  console.log(adminId);
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

  const handleAdding = (date)=>{
    const modifiedDate = new Date(date);
    setAddingDate(modifiedDate);
  }

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

    const modifiedAddingDate = new Date(addingDate);
    modifiedAddingDate.setDate(modifiedAddingDate.getDate() + 1);

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
        ImageUrl:image,
        AddingDate:modifiedAddingDate.toISOString().slice(0,10)
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
    <>
    <h1 className="text-center m-4 bg-slate-400">Hotel Registration</h1>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name of Hotel
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="Name"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="City"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="Address"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="PhoneNumber"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email of Hotel
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="Email"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="Description"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="roomCapacity" className="form-label">
                No. of Rooms
              </label>
              <input
                type="text"
                className="form-control"
                id="roomCapacity"
                name="RoomCapacity"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="roomPrice"
                name="RoomPrice"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="webUrl" className="form-label">
                Website Link
              </label>
              <input
                type="text"
                className="form-control"
                id="webUrl"
                name="WebUrl"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
            <label htmlFor="addingDate" className="form-label mr-3">
              Adding Date:  
            </label>
            <ReactDatePicker
             selected={addingDate}
              onChange={handleAdding}
              dateFormat="yyyy-MM-dd"
              className="form-control ml-3"
              id="addingDate"
              name="AddingDate"
            />
            </div>

          </form>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="form-control"
              accept=".jpeg, .jpg, .png"
              onChange={handleImageChange}
            />
          </div>

          {image && (
            <div className="mb-3">
              <label className="form-label">Image Preview</label>
              <img
                src={`data:image/png;base64,${image}`}
                alt="Preview"
                className="img-thumbnail"
              />
            </div>
          )}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleClick}>
        Submit
      </button>

      <Link style={{marginLeft:"30px"}} href="/paymenthotel">Hotel Payment</Link>
    </div>
    </>
  );
}

export default Hotelreg;
