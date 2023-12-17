import Link from 'next/link'
import TournamentsEditList from './tournamentsList/TournamentsEditList'

function page() {
  return (
    <div>
        <h1 className='text-center'>Tournaments</h1>
        <Link className='text-center btn btn-primary' style={{margin:"20px 0 20px 0",display:"flex",justifyContent:"center"}} href="tournamentsEdit/addtournament">Add Tournament</Link>
        <TournamentsEditList />
    </div>
  )
}

export default page