import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <Link href="/hotelreg">Register Hostel</Link>
      <Link href="/updatehotel">Update Hotel Info</Link>
    </div>
  )
}

export default page