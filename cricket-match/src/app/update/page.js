"use client"
import { useEffect, useState } from "react"

const UpdatePage = () => {

  const [userDetails,SetUserDetails] = useState({});

  useEffect(()=>{
    //Getting the previous info

    if (!localStorage.getItem("login")) {
      window.location.href="/login"
    }else{
      const loginInfo=JSON.parse(localStorage.getItem('login'));
      SetUserDetails(loginInfo);
  
      const { EmailAddress, Fname, Lname, UserName, Contact, CNIC, Address } = loginInfo;

      setReg({
        EmailAddress,
        Fname,
        Lname,
        UserName,
        Contact,
        CNIC,
        Address
      });
    }
  }, []);

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
            Address:reg.Address
      })
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
 
export default UpdatePage;