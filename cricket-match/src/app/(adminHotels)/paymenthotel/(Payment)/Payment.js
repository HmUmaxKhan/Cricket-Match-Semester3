"use client"
import { useEffect, useState } from "react"
import "../(Payment)/payment.css"
function Payment() {

    const [packages,setPackages] = useState({});
    const [adminId,setAdminId] = useState();
    const [name,setname] = useState();

    useEffect(()=>{
        const details= async() =>{
            let detail = localStorage.getItem("adminLogin");

            if (!detail) {
                window.location.href="/registerAdmin"
            }
            detail = await JSON.parse(detail)
            console.log("detail-- ",detail);
            
            if (detail.admin_id && detail.admin_id.length > 0) {
                setAdminId(detail.admin_id[0].admin_id);
            }
        }

        const Price = async() =>{
            let response = await fetch("http://localhost:5005/api/pricehostel");
            response = await response.json();
            console.log("Price",response.results.packageFee);
            setPackages(response.results);
        }

        details();
        Price();
      },[])


    const handleChange = (e) =>{
        setname(e.target.value)
    }

    const handleSubmit = async()=>{
        
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
    admin_id:adminId
};

console.log(dataObject);

let response = await fetch("http://localhost:5005/api/paymentadmin",{
          method:'POST',
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(dataObject)
        });

        response = await response.json();
        console.log(response);
        console.log(adminId);

        if (response.success) {
            window.location.href="/adminDashboard"
        }
        
      }
    

  return (
    <div>
    <div class="container p-0">
    <div class="card px-4">
        <p class="h8 py-3">Payment Details</p>
        <div class="row gx-3">
            <div class="col-12">
                <div class="d-flex flex-column">
                    <p class="text mb-1">Person Name</p>
                    <input class="form-control mb-3" type="text" placeholder="Name" name="Name" onChange={handleChange}/>
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex flex-column">
                    <p class="text mb-1">Card Number</p>
                    <input class="form-control mb-3" type="text" placeholder="1234 5678 435678"/>
                </div>
            </div>
            <div class="col-6">
                <div class="d-flex flex-column">
                    <p class="text mb-1">Expiry</p>
                    <input class="form-control mb-3" type="text" placeholder="MM/YYYY" />
                </div>
            </div>
            <div class="col-6">
                <div class="d-flex flex-column">
                    <p class="text mb-1">CVV/CVC</p>
                    <input class="form-control mb-3 pt-2 " type="password" placeholder="***" />
                </div>
            </div>
            <div class="col-12">
                <div class="btn btn-primary mb-3">
                    <button onClick={handleSubmit} class="ps-3">{packages.packageFee}</button>
                    <span class="fas fa-arrow-right"></span>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Payment