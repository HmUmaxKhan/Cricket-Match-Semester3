"use client";
import Alert from "@/app/(shared components)/Alert";
import { isNumberPositive } from "@/app/(shared components)/validation";
import Loader from "@/app/(spinner)/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({params}) => {
  const router = useRouter();
  const cardStyle = {
    boxShadow: "0 0 10px 8px",
  };

  const [reg, setReg] = useState({
    stop: "",
    arrival_time: "",
    fare: "",
    stop_number: "",
  });

  const [alert, setAlert] = useState(null);

  const [loading,setLoading] = useState(true)

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }


  useEffect(() => {
    //Getting the previous info
    const info = async () => {
      let response = await fetch("http://localhost:5005/api/getupdaterouteinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ route_id: params.updateroute}),
      });
      response = await response.json();

      const { stop,stop_number,arrival_time,fare } = response;

      setReg({
        stop,stop_number,arrival_time,fare
      });
      setLoading(false)
    };
    info();
  }, []);

  const Change = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!isNumberPositive(reg.stop_number)) {
      setAlert({
        msg: "Stop Number must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }

    if (!isNumberPositive(reg.fare)) {
      setAlert({
        msg: "Fare must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }

    let response = await fetch("http://localhost:5005/api/updaterouteinfo", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        route_id :params.updateroute,
        stop: reg.stop,
        arrival_time: reg.arrival_time,
        fare: reg.fare,
        stop_number: reg.stop_number,
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
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
      <div className="card p-4" style={cardStyle}>
        <h3 className=" py-3 text-center">Update route details </h3>
        <div className="mb-3">
          <label htmlFor="Fname" className="form-label">
            Stop Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Fname"
            placeholder="Enter Stop Name"
            name="stop"
            onChange={Change}
            value={reg.stop}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Fname" className="form-label">
            Arrival TIme
          </label>
          <input
            type="time"
            className="form-control"
            id="Fname"
            placeholder="Enter Arrival Time"
            name="arrival_time"
            onChange={Change}
            value={reg.arrival_time}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">
            Fare From This Stop
          </label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Ente rhte Fare"
            name="fare"
            min="100"
            onChange={Change}
            value={reg.fare}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">
            Stop Number
          </label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Ente rhte Fare"
            name="stop_number"
            min="1"
            onChange={Change}
            value={reg.stop_number}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>

    </div>
    )}
    </div>

  );
};

export default page;
