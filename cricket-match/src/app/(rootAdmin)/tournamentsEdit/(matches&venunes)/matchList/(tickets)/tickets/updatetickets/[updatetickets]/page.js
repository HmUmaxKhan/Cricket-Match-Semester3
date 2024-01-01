"use client";
import Alert from "@/app/(shared components)/Alert";
import { isNumberPositive } from "@/app/(shared components)/validation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const page = ({ params }) => {
  const router = useRouter();

  const [tournament_id, setTournamentId] = useState();
  const cardStyle = {
    boxShadow: "0 0 10px 8px",
  };
  const [alert, setAlert] = useState(null);


  console.log(params.updatetickets);

  useEffect(() => {
    //Getting the previous info
    const info = async () => {
      let response = await fetch("http://localhost:5005/api/getsingletickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticket_id: params.updatetickets }),
      });
      response = await response.json();
      console.log(response);

      const { Category, price, total_seats } = response;

      setReg({
        Category,
        price,
        total_seats,
      });
    };

    info();
  }, []);

  const [reg, setReg] = useState({
    Category: "",
    price: "",
    total_seats: "",
  });

  const Change = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const modifiedadd = new Date();
    modifiedadd.setDate(modifiedadd.getDate() + 1);

    if (!isNumberPositive(reg.price)) {
      setAlert({
        msg: "Price must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }
    if (!isNumberPositive(reg.total_seats)) {
      setAlert({
        msg: "Total Seats must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }

    let response = await fetch("http://localhost:5005/api/updatetickets", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ticket_id: params.updatetickets,
        Category: reg.Category,
        price: reg.price,
        total_seats: reg.total_seats,
        AddingDate: modifiedadd.toISOString().slice(0, 10),
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
    <>
    <Alert Alert={alert} />
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
      <div className="card p-4" style={cardStyle}>
        <h3 className=" py-3 text-center">Update the Ticket Details</h3>
        <div className="mb-3">
          <label htmlFor="Fname" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="Fname"
            placeholder="Enter your first name"
            name="Category"
            onChange={Change}
            value={reg.Category}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Lname" className="form-label">
            Price of ticket
          </label>
          <input
            type="text"
            className="form-control"
            id="Lname"
            placeholder="Enter your last name"
            name="price"
            value={reg.price}
            onChange={Change}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">
            Total Seats
          </label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Choose a username"
            name="total_seats"
            value={reg.total_seats}
            onChange={Change}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
    </>
  );
};

export default page;
