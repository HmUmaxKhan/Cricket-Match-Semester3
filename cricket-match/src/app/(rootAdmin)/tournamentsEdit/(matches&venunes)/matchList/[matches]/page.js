"use client"
import{ tournamentIdaction } from '@/app/redux/slice/tournamentId';
import MatchesEditList from '../MatchesList/MatchesEditList'
import Link from 'next/link';
import { useDispatch } from 'react-redux';

function page(params) {
  console.log(params.params.matches);
  const dispatch = useDispatch();

  dispatch(tournamentIdaction(params.params.matches))
  return (
    <div>
    <h1 className='text-center'>Matches</h1>
    <Link className='text-center btn btn-primary' style={{margin:"20px 0 20px 0",display:"flex",justifyContent:"center"}} href={`/tournamentsEdit/matchList/${params.params.matches}/addmatch`}>Add Match</Link>
    <MatchesEditList t_id = {params.params.matches}/>
</div>
  )
}

export default page