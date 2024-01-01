import { pricingCategoryactions } from '@/app/redux/slice/pricingCategory';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux'

function PricingListItems(props) {
    const {packages} = props
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClick =  () =>{
      localStorage.setItem("packageBus_id",JSON.stringify({package_id:packages.package_id}));
      router.push("/transportreg")
    }
  return (
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm border-primary">
          <div class="card-header py-3 text-bg-primary border-primary">
            <h4 class="my-0 fw-normal">{packages.packageName}</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li className='m-4'><h4><b>Duration in Days:</b> {packages.DurationInDays}</h4></li>
              <li><h4 className='m-4'><b>Category:</b> {packages.category}</h4></li>
              <li><h4 className='m-4'><b>Price:</b> {packages.packageFee}</h4></li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary" onClick={handleClick}>Buy</button>
          </div>
        </div>
        </div>
    
    
  )
}

export default PricingListItems