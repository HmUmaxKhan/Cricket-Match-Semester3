"use client"
import { useEffect, useState } from "react"
import Alert from "../(shared components)/Alert";
import Navbar from "../(shared components)/Navbar";
import Link from "next/link";
import { isCnicValid, isPhoneNumberValid } from "../(shared components)/validation";

const UpdatePage = () => {

  const [userDetails,SetUserDetails] = useState({});
  const [img,SetImage] = useState();

  const [alert, setAlert] = useState(null);

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  useEffect(()=>{
    //Getting the previous info

    if (!localStorage.getItem("login")) {
      window.location.href="/login"
    }else{
      const loginInfo=JSON.parse(localStorage.getItem('login'));
      SetUserDetails(loginInfo);
  
      const { EmailAddress, Fname, Lname, UserName, Contact, CNIC, Address , ProfilePhoto} = loginInfo;

      setReg({
        EmailAddress,
        Fname,
        Lname,
        UserName,
        Contact,
        CNIC,
        Address
      });
      SetImage(ProfilePhoto)
    }
  }, []);

  const cardStyle = {
    boxShadow: "0 0 10px 8px rgba(0,0,0,0.1)",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    convertToBase64(file);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      SetImage(base64String);
    };

    // Ensure to read the file as data URL
    reader.readAsDataURL(file);
  };


  const [reg, setReg] = useState({
    EmailAddress: "",
    Fname: "",
    Lname: "",
    UserName: "",
    Contact: "",
    CNIC: "",
    Address:""
  });

  const Change = (e)=>{
     setReg({...reg,[e.target.name]:e.target.value})
  }

  const handleClick =async (e) =>{
    e.preventDefault();

    if (!isCnicValid(reg.CNIC)) {
      setAlert({
        msg: "Invalid CNIC ",
        type: "danger",
      });
      return;
    }

    if (!isPhoneNumberValid(reg.Contact)) {
      setAlert({
        msg: "Invalid Contact Number ",
        type: "danger",
      });
      return;
    }


    console.log(reg);
    let response = await fetch("http://localhost:5005/api/auth/update",{
      method:'PUT',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
            EmailAddress:reg.EmailAddress,
            Fname:reg.Fname,
            Lname:reg.Lname,
            UserName:reg.UserName,
            Contact:reg.Contact,
            CNIC:reg.CNIC,
            Address:reg.Address,
            ProfilePhoto:img
      })
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
        router.push("/login");
      }, 3000);
    }
  }

  return (
    <div style={background}>
    <Navbar />
    <Alert Alert={alert} />
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
      <div className="card p-4" style={cardStyle}>
        <h3 className=" py-3 text-center">
           Update Profile
        </h3>

        <div className="mb-3">
          <label htmlFor="Fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Fname"
            placeholder="Enter your first name"
            name="Fname"
            onChange={Change}
            value={reg.Fname}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Lname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Lname"
            placeholder="Enter your last name"
            name="Lname"
            onChange={Change}
            value={reg.Lname}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Choose a username"
            name="UserName"
            onChange={Change}
            value={reg.UserName}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="EmailAddress" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="EmailAddress"
            placeholder="name@example.com"
            name="EmailAddress"
            onChange={Change}
            value={reg.EmailAddress}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Contact" className="form-label">
            Phone <small>(Use country code like +92 and do not includes the dashes)</small>
          </label>
          <input
            type="text"
            className="form-control"
            id="Contact"
            placeholder="Enter your phone number"
            name="Contact"
            onChange={Change}
            value={reg.Contact}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="Address"
            placeholder="Enter your address"
            name="Address"
            onChange={Change}
            value={reg.Address}
          />
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

          {img && (
            <div className="mb-3">
              <label className="form-label">Image Preview</label>
              <img
                src={`data:image/png;base64,${img}`}
                alt="Preview"
                className="img-thumbnail"
              />
            </div>
          )}
        </div>

        <button type="button" className="btn btn-success" onClick={handleClick}>
          Submit
        </button>

        <Link href="/login" className="link  mt-3">
          Login
        </Link>
      </div>
    </div>
    </div>


  )

}
 
export default UpdatePage;