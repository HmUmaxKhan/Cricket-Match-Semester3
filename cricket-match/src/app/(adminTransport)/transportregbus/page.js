"use client";

import Alert from "@/app/(shared components)/Alert";
import { isNumberPositive, isPhoneNumberValid } from "@/app/(shared components)/validation";
import Loader from "@/app/(spinner)/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function Hotelreg() {

  const router = useRouter();
  const [adminId, setAdminId] = useState();
  const [image, setImage] = useState();
  const [addingDate,setAddingDate]=useState(new Date());
  const [user_id, setUserId] = useState();

  const [alert, setAlert] = useState(null);

  const [loading,setLoading] = useState(true)

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  useEffect(() => {
    const details = async () => {
      let detail = localStorage.getItem("adminTransLogin");

      if (!detail) {
        router.push("/logintransport");
      }
  
      detail = JSON.parse(detail);

      console.log(detail);
  
      setUserId(detail.user_id);


  
      if (detail.usertype!=='transportadmin') {
        router.push("/transportreg")
      }

      if (detail.admin_id) {
        setAdminId(detail.admin_id);
      }

      
    };

    const getBlock = async()=>{
      let response = await fetch ("http://localhost:5005/api/getblocked",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({admin_id:details.admin_id})
      });

      response =await response.json();

      let pkg_id = localStorage.getItem("packageBus_id");
      pkg_id = JSON.parse(pkg_id);

       if(response===0){ 
        if (pkg_id==null) {
          router.push("/pricingbus")
        }else{  
       window.location.href='/paymenttransport'
        }
      }
      
    }


    details();
    getBlock();
    setLoading(false)
    
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

 console.log(adminId);

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
        AddingDate:modifieddate.toISOString().slice(0,10),
        user_id:user_id
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
      }, 3000);
    }
  };

  return (
    <div style={background}>
    {loading?(<Loader />):(
    <div>
    <Alert Alert={alert} />
    <h1 className="text-center mb-4 bg-slate-400">Transport Registration</h1>
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
                Contact <small>(Use country code like +92 and do not includes the dashes)</small>
              </label>
              <input
                type="text"
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
                Capacity of Passengers <small>(Must be greater than 0)</small>
              </label>
              <input
                type="text"
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
    
    </div>
    )}
    </div>

  );
}

export default Hotelreg;
