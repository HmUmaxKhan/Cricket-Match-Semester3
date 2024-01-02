import Link from 'next/link'
import React from 'react'
import ListHistory from './componentsofhistory/ListHistory'

function page() {

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  return (
    <div style={background}>
    <h1 className='text-center mb-3'>History</h1>
    <ListHistory />
</div>
  )
}

export default page