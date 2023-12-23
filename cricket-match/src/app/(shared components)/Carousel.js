import Image from 'next/image'
import React from 'react'

function Carousel() {
    const cardStyle = {
        height:"80vh",
        objectFit:'cover'
    }
  return (
    <div className='container'>
<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
<div className="carousel-inner">
  <div className="carousel-item active">
    <img src="Stadium2.jpg" className="w-100" style={cardStyle} alt="First Image"/>
  </div>
  <div className="carousel-item" >
    <img src="/Hotel1.jpg" className="d-block w-100" alt="Second Image"   style={cardStyle}/>
  </div>
  <div className="carousel-item" >
    <img src="/Bus1.jpg" className="d-block w-100" alt="Third Image" style={cardStyle}/>
  </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
    </div>
  )
}

export default Carousel