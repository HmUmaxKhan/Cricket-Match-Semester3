"use client"
import Link from 'next/link'
import React from 'react'
import RouteList from '../component of routes/RouteList'
import { useDispatch } from 'react-redux'
import { transportIdaction } from '@/app/redux/slice/transportIdSlice'

function page({params}) {

  const dispatch = useDispatch();
  dispatch(transportIdaction(params.routes));
  
  return (
    <div>
        <h1 className='text-center'>Route Info</h1>
        <Link className='text-center btn btn-primary' style={{margin:"20px 0 20px 0",display:"flex",justifyContent:"center"}} href="/transportdashboard/route/addroute">Add Route</Link>
        <p className='text-center'><small className="text-body-secondary"><i>(Please enter stop numbers in the sequence from strat to destination)</i></small></p>
        <RouteList transport_id = {params.routes}/>
    </div>
  )
}

export default page