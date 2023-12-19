import Link from 'next/link'
import React from 'react'
import PackagesList from './Package Component/PackagesList'

function page() {
  return (
    <div>
    <h1 className='text-center mt-3 mb-3'>Packages</h1>
    <Link className='text-center btn btn-primary' style={{margin:"20px 0 20px 0",display:"flex",justifyContent:"center"}} href="/packages/addpackage">Add Package</Link>
    <PackagesList />
</div>
  )
}

export default page