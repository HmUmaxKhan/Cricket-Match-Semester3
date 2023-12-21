"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function Hotelreg() {

  const router = useRouter();
  const [adminId, setAdminId] = useState();
  const [image, setImage] = useState();
  const [addingDate,setAddingDate]=useState(new Date());

  useEffect(() => {
    const details = async () => {
      let detail = localStorage.getItem("adminTransLogin");

      if (!detail) {
        router.push("/paymenttransport");
      }
  
      detail = JSON.parse(detail);
  
      console.log(detail);
  
      if (detail.usertype!=='transportadmin') {
        router.push("/paymenttransport")
      }
  
      if(detail.blocked===0) {
        router.push("/paymenttransport")
      }

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


  const [reg, setReg] = useState({
    transportName: "",
    email: "",
    contact: "",
    website: "",
    numberPlate: "",
    capacity: "",
    model: "",
    city: "",
  });

  const Change = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const modifieddate = new Date();
    modifieddate.setDate(modifieddate.getDate()+1);

    let response = await fetch("http://localhost:5005/api/transportreg", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        transportName: reg.transportName,
        email: reg.email,
        contact: reg.contact,
        website: reg.website,
        numberPlate:reg.numberPlate,
        capacity: reg.capacity,
        model: reg.model,
        city: reg.city,
        admin_id: adminId,
        ImageUrl:image,
        AddingDate:modifieddate.toISOString().slice(0,10)
      }),
    });
    response = await response.json();
    console.log(response);

    console.log(reg);
    console.log(adminId);
    console.log("image:",image);

    if (response.success) {
      router.push("/transportdashboard");
    }
  };

  return (
    <>
    <h1 className="text-center m-4 bg-slate-400">Transport Registration</h1>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name of Transport Company
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="transportName"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                city
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                email
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="email"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Contact
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="contact"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                No. Plate of Transport
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="numberPlate"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Model
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="model"
                onChange={Change}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="roomCapacity" className="form-label">
                Capacity of Passengers
              </label>
              <input
                type="number"
                className="form-control"
                id="roomCapacity"
                name="capacity"
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
                name="website"
                onChange={Change}
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
