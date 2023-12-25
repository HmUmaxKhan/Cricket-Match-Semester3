import Link from 'next/link'
import React from 'react'

function Pricing() {
  return (
    <div className="container">
  <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h1 class="display-4 fw-normal text-body-emphasis">Pricing</h1>
      <p class="fs-5 text-body-secondary">
      Explore our flexible pricing plans designed for admins to showcase their hotels and transport facilities seamlessly. With various subscription options, you can choose the plan that aligns perfectly with your business goals. Unlock premium features, increase visibility, and attract a broader audience by subscribing to our plans. Whether you're a hotel owner or transport service provider, our subscription models offer a cost-effective way to enhance your online presence during cricket matches. Join us today and elevate your business with our tailored pricing plans, ensuring a successful and rewarding experience.</p>
      <Link className='btn btn-primary text-center' style={{marginRight:"10px"}} href='/pricingbus'>Plans For Transport</Link>
      <Link className=' btn btn-primary text-center' href='/pricinghotel'>Plans For Hotels</Link>
    </div>
    </div>
  )
}

export default Pricing