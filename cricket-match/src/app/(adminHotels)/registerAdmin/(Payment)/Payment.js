"use client"
import { useEffect, useState } from "react"
import "../(Payment)/payment.css"
function Payment() {

    const [price,setPrice] = useState({});
    const [detail,setDetail] = useState({});
    const [name,setname] = useState();

    useEffect(()=>{
        const priceID = async()=>{
            let response = await fetch("http://localhost:5005/api/getPriceHostel");

            const responseId = await response.json();
            setPrice(responseId.details[0])
        }

        priceID();
    })


    const handleChange = (e) =>{
        setname(e.target.value)
    }

    const handleSubmit = ()=>{
        
const currentDate = new Date();
const expiringDate = new Date(currentDate);
expiringDate.setDate(currentDate.getDate() + price.DurationInDays);

const dataObject = {
    Name: name,
    amount: price.packageFee,
    package_id: price.package_id,
    startingDate: currentDate,
    expiringDate: expiringDate,
    admin_id:""
};

console.log(dataObject);
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
                    <button onClick={handleSubmit} class="ps-3">{price.packageFee}</button>
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