import React from 'react'
import TransportList from '../../componentsOfTransport/TransportList'

function page({params}) {

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }


  return (
    <div style={background}>
        <TransportList matchId={params.transport}/>
    </div>
  )
}

export default page