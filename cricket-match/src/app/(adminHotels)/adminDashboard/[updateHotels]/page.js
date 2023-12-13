"use client"
import { useEffect, useState } from "react"

const page = (params) => {

  const [image,setImage] = useState();

  useEffect(()=>{
    //Getting the previous info
        const info = async()=>{
        let response = await fetch("http://localhost:5005/api/updatehotelinfo",{
            method:'POST',
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({hotel_id:params.params.updateHotels})
          });
          response = await response.json();
          console.log(response);

          const { Email,Name,City,PhoneNumber,Address,Description,RoomPrice,RoomCapacity,WebUrl,ImageUrl } = response;

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

    }

    info();
    },[]);


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

  const Change = (e)=>{
     setReg({...reg,[e.target.name]:e.target.value})
  }

  const handleClick =async (e) =>{
    e.preventDefault();
    console.log(reg);
    let response = await fetch("http://localhost:5005/api/updatehotelinfo",{
      method:'PUT',
      headers:{
        "content-type":"application/json",
        "auth-token":""
      },
      body: JSON.stringify({
        hotel_id:params.params.updateHotels,
        Email: reg.Email,
        Name: reg.Name,
        PhoneNumber: reg.PhoneNumber,
        City: reg.City,
        Address: reg.Address,
        RoomCapacity: reg.RoomCapacity,
        Description: reg.Description,
        RoomPrice: reg.RoomPrice,
        WebUrl: reg.WebUrl,
        ImageUrl:image
      }),
    });
    response = await response.json();
    console.log(response);
  }

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
        value={reg.Name}
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
        value={reg.City}
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
        value={reg.Address}
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
        value={reg.PhoneNumber}
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
        value={reg.Email}
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
        value={reg.Description}
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
        value={reg.RoomCapacity}
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
        value={reg.RoomPrice}
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
        value={reg.WebUrl}
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
    </div>

  )

}
 
export default page;