"use client";

import Alert from "@/app/(shared components)/Alert";
import { isNumberPositive, isPhoneNumberValid } from "@/app/(shared components)/validation";
import Loader from "@/app/(spinner)/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function page(params) {

  const [adminId, setAdminId] = useState();
  const [image, setImage] = useState();
  const [addingDate,setAddingDate]=useState(new Date());

  const background = {
    backgroundImage: 'url("/bgImage.jpg")',
    backgroundSize: "cover",
    minHeight: "100vh",
    width: "100%",
  };
  const router = useRouter();
  const [alert, setAlert] = useState(null);

  const [loading,setLoading] = useState(true);



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

      if (detail.admin_id) {
        setAdminId(detail.admin_id);
      }
    };

    const info = async()=>{
        let response = await fetch("http://localhost:5005/api/getupdatetransportinfo",{
            method:'POST',
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({transport_id:params.params.updatetransport})
          });
          response = await response.json();
          console.log(response);

          const {
            transportName,
            model,
            numberPlate,
            capacity,
            city,
            email,
            website,
            contact,
            ImageUrl,
            admin_id,
            AddingDate, } = response;

          setImage(ImageUrl);
          setReg({
            transportName,
            model,
            numberPlate,
            capacity,
            city,
            email,
            website,
            contact,
            });

          setAddingDate(new Date(AddingDate.slice(0,10)));
          setLoading(false);
    }

    info();

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


    if (!isPhoneNumberValid(reg.contact)) {
      setAlert({
        msg: "Invalid Contact Number ",
        type: "danger",
      });
      return;
    }
    if (!isNumberPositive(reg.capacity)) {
      setAlert({
        msg: "Capacity must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }


    const modifieddate = new Date();
    modifieddate.setDate(modifieddate.getDate()+1);

    let response = await fetch("http://localhost:5005/api/updatetransportinfo", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        transport_id:params.params.updatetransport,
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

    setAlert({
      msg: response.Msg,
      type: response.success ? 'success' : 'danger',
    });

    setTimeout(() => {
      setAlert(null);
    }, 5000);

    if (response.success) {
        setTimeout(() => {
        setAlert(null);
        router.back();
      }, 5000);
    }
  };

  return (
    <div style={background}>
    {loading?(<Loader />):(
    <div>
    <Alert Alert={alert} />
    <h1 className="text-center m-4 bg-slate-400">Transport Update</h1>
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
                value={reg.transportName}
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
                name="city"
                onChange={Change}
                value={reg.city}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="email"
                onChange={Change}
                value={reg.email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Contact
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="contact"
                onChange={Change}
                value={reg.contact}
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
                value={reg.numberPlate}
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
                value={reg.model}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="roomCapacity" className="form-label">
                Capacity of Passengers
              </label>
              <input
                type="text"
                className="form-control"
                id="roomCapacity"
                name="capacity"
                onChange={Change}
                value={reg.capacity}
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
                value={reg.website}
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
    </div>
    </div>
    )}
    </div>
  );
}

export default page;
