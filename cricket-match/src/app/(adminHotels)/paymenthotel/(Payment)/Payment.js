"use client";
import { useEffect, useState } from "react";
import "../(Payment)/payment.css";
import { useSelector } from "react-redux";
function Payment() {
  const [packages, setPackages] = useState({});
  const [adminId, setAdminId] = useState();
  const [name, setname] = useState();

  const package_id = useSelector((state)=>state.pricingCategoryHotel.packageId)

  console.log(package_id);

  useEffect(() => {
    let detail = localStorage.getItem("adminLogin");

    if (!detail) {
      window.location.href = "/registerAdmin";
    }
    detail = JSON.parse(detail);
    console.log("detail-- ", detail);

    setAdminId(detail.admin_id)

    console.log(detail.admin_id);

    const Price = async () => {
      let pkg_id = localStorage.getItem("package_id");
      pkg_id = JSON.parse(pkg_id);
      console.log(pkg_id);
      
      let response = await fetch("http://localhost:5005/api/pricehotel", {
        method: "POST", 
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          package_id: pkg_id.package_id,
        }),
      });

      response = await response.json();
      setPackages(response);
      console.log(response);
    };
    Price();
  }, []);

  const handleChange = (e) => {
    setname(e.target.value);
  };

  const handleSubmit = async () => {
    const currentDate = new Date();
    const expiringDate = new Date(currentDate);
    expiringDate.setDate(currentDate.getDate() + packages.DurationInDays);

    const mysqlCurrentDate = currentDate.toISOString().slice(0, 10);
    const mysqlExpiringDate = expiringDate.toISOString().slice(0, 10);

    const dataObject = {
      Name: name,
      amount: packages.packageFee,
      package_id: packages.package_id,
      startingDate: mysqlCurrentDate,
      expiringDate: mysqlExpiringDate,
      admin_id: adminId,
    };

    console.log(dataObject);

    let response = await fetch("http://localhost:5005/api/paymentadmin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataObject),
    });

    response = await response.json();
    console.log(response);
    localStorage.setItem("paymentHotel", JSON.stringify(response));

    if (response.success) {
      window.location.href = "/adminDashboard";
    }
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
          <div className="col-12 d-flex align-items-center  justify-center">
            <button
              onClick={handleSubmit}
              className="btn btn-primary d-flex align-items-center  justify-center"
            >
              <span>{packages.packageFee}</span>
              <span className="fas fa-arrow-right"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
