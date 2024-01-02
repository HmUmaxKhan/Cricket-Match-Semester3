"use client";
import Alert from "@/app/(shared components)/Alert";
import { isNumberPositive } from "@/app/(shared components)/validation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const page = () => {
  const [tournament_id, setTournamentId] = useState();
  const [user_id,setUserId] = useState();

  const cardStyle = {
    boxShadow: "0 0 10px 8px",
  };

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  const [reg, setReg] = useState({
    DurationInDays: "",
    packageName: "",
    packageFee: "",
    category:""
  });
  const [alert, setAlert] = useState(null);
  const router = useRouter()
  

  const Change = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    let details = localStorage.getItem("rootLogin");
    details = JSON.parse(details);
    console.log(details.user_id);
    setUserId(details.user_id)
  },[])

  const handleClick = async (e) => {
    e.preventDefault();
    const modifiedadd = new Date();
    modifiedadd.setDate(modifiedadd.getDate() + 1);

    if (!isNumberPositive(reg.DurationInDays)) {
      setAlert({
        msg: "Days must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }

    if (!isNumberPositive(reg.packageFee)) {
      setAlert({
        msg: "Price must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }

    let response = await fetch("http://localhost:5005/api/addpackages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        DurationInDays: reg.DurationInDays,
        packageName: reg.packageName,
        packageFee: reg.packageFee,
        category:reg.category,
        AddingDate: modifiedadd.toISOString().slice(0, 10),
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
    <Alert Alert={alert} />
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
      <div className="card p-4" style={cardStyle}>
        <h3 className=" py-3 text-center">Update the Package</h3>
        <div className="mb-3">
          <label htmlFor="Fname" className="form-label">
            Duration IN Days <small>(Must be greater than 0)</small>
          </label>
          <input
            type="text"
            className="form-control"
            id="Fname"
            placeholder="Enter your first name"
            name="DurationInDays"
            onChange={Change}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Lname" className="form-label">
            Package Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Lname"
            placeholder="Enter your last name"
            name="packageName"
            onChange={Change}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="transportCategory"
              name="category"
              value="transport"
              onChange={Change}
            />
            <label className="form-check-label" htmlFor="transportCategory">
              Transport
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hotelCategory"
              name="category"
              value="hotel"
              onChange={Change}
            />
            <label className="form-check-label" htmlFor="hotelCategory">
              Hotel
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">
            Package Fee <small>(Must be greater than 0)</small>
          </label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Choose a username"
            name="packageFee"
            onChange={Change}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
    </div>
  );
};

export default page;
