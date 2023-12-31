"use client";
import Alert from "@/app/(shared components)/Alert";
import { isNumberPositive, isPhoneNumberValid } from "@/app/(shared components)/validation";
import Loader from "@/app/(spinner)/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const page = (params) => {
  const [image, setImage] = useState();
  const [addingDate, setAddingDate] = useState(new Date());

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
    //Getting the previous info
    const info = async () => {
      let response = await fetch("http://localhost:5005/api/updatehotelinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotel_id: params.params.updateHotels }),
      });
      response = await response.json();
      console.log(response);

      const {
        Email,
        Name,
        City,
        PhoneNumber,
        Address,
        Description,
        RoomPrice,
        RoomCapacity,
        WebUrl,
        ImageUrl,
        AddingDate,
      } = response;

      setImage(ImageUrl);
      setReg({
        Email,
        Name,
        City,
        PhoneNumber,
        Address,
        Description,
        RoomPrice,
        RoomCapacity,
        WebUrl,
      });

      setAddingDate(new Date(AddingDate.slice(0, 10)));
      setLoading(false);
    };

    info();
  }, []);

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
    
    if (!isPhoneNumberValid(reg.PhoneNumber)) {
      setAlert({
        msg: "Invalid Contact Number ",
        type: "danger",
      });
      return;
    }
    if (!isNumberPositive(reg.RoomCapacity)) {
      setAlert({
        msg: "RoomCapacity must be greater than 0 and contains onlu numbers",
        type: "danger",
      });
      return;
    }
    if (!isNumberPositive(reg.RoomPrice)) {
      setAlert({
        msg: "Room Price must be greater than 0 and contains onlu numbers",
        type: "danger",
      });
      return;
    }


    let response = await fetch("http://localhost:5005/api/updatehotelinfo", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": "",
      },
      body: JSON.stringify({
        hotel_id: params.params.updateHotels,
        Email: reg.Email,
        Name: reg.Name,
        PhoneNumber: reg.PhoneNumber,
        City: reg.City,
        Address: reg.Address,
        RoomCapacity: reg.RoomCapacity,
        Description: reg.Description,
        RoomPrice: reg.RoomPrice,
        WebUrl: reg.WebUrl,
        ImageUrl: image,
        AddingDate: addingDate.toISOString().slice(0, 10),
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
    <Alert Alert={alert} />
    {loading?(<Loader />):(
    <div>
      <h1 className="text-center mb-4 bg-slate-400">Hotel Registration</h1>
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
                  value={reg.Name}
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
                  value={reg.City}
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
                  value={reg.Address}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="PhoneNumber"
                  onChange={Change}
                  value={reg.PhoneNumber}
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
                  value={reg.Email}
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
                  value={reg.Description}
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
                  value={reg.RoomCapacity}
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
                  value={reg.RoomPrice}
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
                  value={reg.WebUrl}
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
      </div>)}
    </div>
  );
};

export default page;
