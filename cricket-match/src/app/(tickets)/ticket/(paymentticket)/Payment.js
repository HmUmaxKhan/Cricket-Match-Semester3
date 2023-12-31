"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
function Payment() {
  
  const router = useRouter();

  const ticket = useSelector((state)=>state.ticket.ticketPayment)
  const [selectedQuantity,setSelectedQuantity] = useState(0);
  

  const handleChange = (e) => {
    setname(e.target.value);
  };
  
  const handleSubmit = async () => {
   console.log("submit");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center p-0 min-vh-100">
    <div className="card px-4">
      <p className="h8 py-3">Payment Details</p>
      <div className="row gx-3">
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="personName" className="text mb-1">
              Person Name
            </label>
            <input
              className="form-control"
              type="text"
              id="personName"
              placeholder="Name"
              name="Name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="cardNumber" className="text mb-1">
              Card Number
            </label>
            <input
              className="form-control"
              type="text"
              id="cardNumber"
              placeholder="1234 5678 435678"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="expiry" className="text mb-1">
              Expiry
            </label>
            <input
              className="form-control"
              type="text"
              id="expiry"
              placeholder="MM/YYYY"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="cvv" className="text mb-1">
              CVV/CVC
            </label>
            <input
              className="form-control pt-2"
              type="password"
              id="cvv"
              placeholder="***"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="ticketQuantity" className="text mb-1">
              Select Ticket Quantity
            </label>
            <select
              className="form-select"
              id="ticketQuantity"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
            >
              {[0, 1, 2, 3, 4].map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={handleSubmit}
            className="btn btn-outline-primary d-flex align-items-center justify-center"
          >
            <span>{ticket.ticketPrice*selectedQuantity}</span>
            <span className="fas fa-arrow-right"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Payment;
