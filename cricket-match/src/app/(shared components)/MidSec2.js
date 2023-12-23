import Link from 'next/link'
import React from 'react'

function MidSec2() {

    const cardStyle = {
        height:"500px",
        width: "500px",
        objectFit:'cover'
    }
  return (
    <>
    
    <div className='container mt-5'>
    <hr className='mb-5'></hr>
    <h1 className='text-center mb-5 container'><b><i>Provider Hub</i></b></h1>
    <p className="text-center mb-5">
    Maximize Your Profits: Elevate your business by showcasing your hotels and transport facilities with us. Our platform opens the door to a broader audience, allowing you to increase bookings and revenue. Whether you own a hotel or provide transport services, becoming a featured partner ensures heightened visibility and accessibility. With our one-stop solution, customers can seamlessly book prime seats, accommodations, and hassle-free transport—all contributing to an enhanced match-day experience. Don't miss the chance to boost your profits; join us today and witness the financial benefits of showcasing your services to a cricket-loving audience!</p>
    <hr class="featurette-divider" style={{margin:"5rem 0"}} />
    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading fw-normal lh-1 text-center"> Showcase Your Hotels</h2>
        <p class="lead mt-5">Amplify Your Earnings: Showcase your hotels to a cricket-loving audience and witness a surge in profits. By featuring your accommodations on our platform, you tap into a vast community of sports enthusiasts looking for the perfect stay. Capture the attention of cricket fans and boost your revenue as they choose your hotel for an enhanced match-day experience. With seamless bookings and increased visibility, our platform provides a lucrative avenue to elevate your business. Don't miss the opportunity to turn cricket excitement into a profitable venture—join us today and elevate your hotel's presence for a winning combination of sports and hospitality.</p>
        <p><Link class="btn btn-primary" href="/hotelloginAdmin">LogIn »</Link>
        <Link class="btn btn-primary" style={{marginLeft:"20px"}} href="/registerAdmin">SignUp »</Link>
        </p>
      </div>
      <div class="col-md-5">
        <img src='/Hotel2.jpg' style={cardStyle}/>
      </div>
    </div>

    <hr class="featurette-divider" style={{margin:"5rem 0"}} />

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading fw-normal lh-1">Showcase Your Transport Facility</h2>
        <p class="lead">              
        Elevate your business with premium transport services for cricket enthusiasts, unlocking significant profit potential. Our platform offers a unique opportunity for providers to expand their reach and attract a diverse customer base. Whether it's plush shuttles, dependable car services, or group transportation, showcasing your offerings ensures maximum visibility among cricket fans. Seize the chance for increased bookings and revenue, meeting the demand for convenient transport options on match days. Join us today to integrate your services into the cricket experience, ensuring both customer satisfaction and business success.</p>
        <p><Link class="btn btn-primary" href="/logintransport">LogIn »</Link>
        <Link class="btn btn-primary" style={{marginLeft:"20px"}} href="/transportreg">SignUp »</Link>
        </p>
      </div>
      <div class="col-md-5 order-md-1">
      <img src="/Bus3.jpg" alt="Placeholder: 500x500" class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" />

      </div>
    </div>

    </div>
    <hr class="featurette-divider" style={{margin:"5rem 0"}} />
    </> 
  )
}

export default MidSec2