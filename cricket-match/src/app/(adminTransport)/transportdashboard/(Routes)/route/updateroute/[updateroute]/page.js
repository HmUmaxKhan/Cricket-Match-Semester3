"use client";
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
    };
    info();
  }, []);

  const Change = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:5005/api/addroute", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        stop: reg.stop,
        arrival_time: reg.arrival_time,
        fare: reg.fare,
        stop_number: reg.stop_number,
      }),
    });
    response = await response.json();
    console.log(response);
    router.back();
  };

  return (
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
            type="number"
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
            type="number"
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
  );
};

export default page;
