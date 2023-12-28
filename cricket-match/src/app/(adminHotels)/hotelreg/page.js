import React from 'react'
import Hotelreg from './(HotelReg)/Hotelreg'

function page() {

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    height:'100%',
    width:'100%'
  }


  return (
    <div style={background}>
        <Hotelreg />
    </div>
  )
}

export default page