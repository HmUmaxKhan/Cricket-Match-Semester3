"use client"
import TicketEditList from '../ticketsComponents/TicketEditList'
import Link from 'next/link'
import { matchIdaction } from '@/app/redux/slice/matchIdSlice';
import { useDispatch } from 'react-redux';

function page({params}) {

  console.log(params.tickets);
  const dispatch = useDispatch();
  dispatch(matchIdaction(params.tickets))

  return (
    <div>
        <h1 className='text-center'>Ticket Info</h1>
        <Link className='text-center btn btn-primary' style={{margin:"20px 0 20px 0",display:"flex",justifyContent:"center"}} href="addticket">Add Ticket</Link>
        <TicketEditList match_id = {params.tickets}/>
    </div>
  )
}

export default page