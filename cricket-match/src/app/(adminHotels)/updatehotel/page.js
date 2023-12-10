"use client"
import { useEffect, useState } from "react"

const page = () => {

  const [userDetails,SetUserDetails] = useState({});

  useEffect(()=>{
    //Getting the previous info

    const details = localStorage.getItem("adminLogin");
    console.log(details);
    if (!details && details===null && details.usertype=="hosteladmin") {
        window.location.href="/loginAdmin"
    }
    details = JSON.parse(details)
    console.log(details);
    SetUserDetails(details);

    const info = async()=>{
        let response = await fetch("http://localhost:5005/api/updatehotelinfo",{
            method:'GET',
            headers:{
              "content-type":"application/json",
              "auth-token":userDetails.token
            },
          });
          response = await response.json();
          console.log(response);

          const { Email,Name,City,PhoneNumber,Address,Description,RoomPrice,RoomCapacity,WebUrl, ImageUrl } = response;

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
    let response = await fetch("http://localhost:5005/api/auth/update",{
      method:'PUT',
      headers:{
        "content-type":"application/json",
        "auth-token":""
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
  }

  return (
    <div className='container flex justify-center items-center flex-col'  style={{height:"100vh"}}> 

    <div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Fname" value={reg.Fname} onChange={Change} />
  <label htmlFor="floatingInput">First Name</label>
</div>
<br></br>

    <div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Lname" value={reg.Lname} onChange={Change} readOnly/>
  <label htmlFor="floatingInput">Last Name</label>
</div>
<br></br>


    <div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="UserName" value={reg.UserName} onChange={Change} />
  <label htmlFor="floatingInput">Username</label>
</div>
<br></br>


<div className="form-floating mb-3 ">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="EmailAddress" value={reg.EmailAddress} onChange={Change} />
  <label htmlFor="floatingInput">Email address</label>
</div>
<br></br>


<div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={reg.Contact} name="Contact" onChange={Change} />
  <label htmlFor="floatingInput">Phone</label>
</div>
<br></br>

<div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="CNIC" value={reg.CNIC} onChange={Change} disabled/>
  <label htmlFor="floatingInput">CNIC</label>
</div>
<br></br>

<div className="form-floating mb-3 ">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="Address" value={reg.Address} onChange={Change} />
  <label htmlFor="floatingInput">CNIC</label>
</div>
<br></br>

<button className=' text-center bg-slate-400' onClick={handleClick}>Submit</button>
    </div>

  )

}
 
export default page;