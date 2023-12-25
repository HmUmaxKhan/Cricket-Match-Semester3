"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [image, setImage] = useState();

  const cardStyle = {
    boxShadow: "0 0 10px 8px",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    convertToBase64(file);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setImage(base64String);
    };

    // Ensure to read the file as data URL
    reader.readAsDataURL(file);
  };

  const [reg, setReg] = useState({
    EmailAddress: "",
    Fname: "",
    Lname: "",
    UserName: "",
    Password: "",
    CNIC: "",
    Contact: "",
  });

  const Change = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5005/api/transportregown", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        EmailAddress: reg.EmailAddress,
        Fname: reg.Fname,
        Lname: reg.Lname,
        UserName: reg.UserName,
        Password: reg.Password,
        Contact: reg.Contact,
        CNIC: reg.CNIC,
        Address: reg.Address,
        usertype: "transportadmin",
        ProfilePhoto: image,
      }),
    });
    response = await response.json();
    console.log(response);
    localStorage.setItem("adminTransLogin", JSON.stringify(response));

    router.push("/logintransport");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
      <div className="card p-4" style={cardStyle}>
        <h3 className=" py-3 text-center">
          Registration Information for Transport Admin
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
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Enter your password"
            name="Password"
            onChange={Change}
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
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Contact" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="Contact"
            placeholder="Enter your phone number"
            name="Contact"
            onChange={Change}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="CNIC" className="form-label">
            CNIC
          </label>
          <input
            type="text"
            className="form-control"
            id="CNIC"
            placeholder="Enter your CNIC"
            name="CNIC"
            onChange={Change}
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

        <button type="button" className="btn btn-success" onClick={handleClick}>
          Submit
        </button>

        <Link href="/logintransport" className="link  mt-3">
          Login
        </Link>
      </div>
    </div>
  );
}

export default page;
