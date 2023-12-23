import React from 'react'

function MidSec() {
    const cardStyle = {
        width:"140px",
        height:"140px",
        borderRadius:"100%"
    }
  return (
    <>
    
    <div className='container mt-5'>
    <hr className='mb-5'></hr>
    <h1 className='text-center mb-5 container'><b><i>Services</i></b></h1>
    <p className="text-center mb-5">
    Our services offer a comprehensive experience for cricket matches, covering ticket booking, hotel reservations, and transport services. Whether you're at the stadium or planning a complete match-day experience, we've got you covered with prime seat bookings and convenient accommodations. Our transport services make your journey hassle-free. We aim for a one-stop solution, ensuring a memorable, convenient, and enjoyable cricket match experience.</p>
    <div class="row">
      <div class="col-lg-4">
      <img src='/Stadium1.jpg' style={cardStyle} />
        <h2 class="fw-normal">Ticket Booking</h2>
        <p>
            Experience the thrill of cricket matches with our seamless ticket booking service, securing prime seats at the stadium. Enjoy the convenience of planning a memorable match-day experience with us.
        </p>
      </div>

      <div class="col-lg-4">
      <img src='/Hotel3.jpg' style={cardStyle} />
        <h2 class="fw-normal">Hotel Booking</h2>
        <p>
        Simplify your stay with our hassle-free hotel booking service, ensuring convenient accommodations within the match venue. Reserve a comfortable space for an enjoyable match experience.</p>
      </div>
      <div class="col-lg-4">
      <img src='/Bus2.jpeg' style={cardStyle} />
        <h2 class="fw-normal">Transport Facility</h2>
        <p>
        Simplify your travel to and from cricket matches with our efficient transport booking services. Ensure a hassle-free journey as you focus on enjoying the game.</p>
      </div>
    </div>
    </div>
    </>
  )
}

export default MidSec