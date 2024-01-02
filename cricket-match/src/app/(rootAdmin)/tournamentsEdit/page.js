import Link from 'next/link'
import TournamentsEditList from './tournamentsList/TournamentsEditList'

function page() {

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  return (
    <div style={background}>
        <h1 className='text-center'>Tournaments</h1>
        <Link className='text-center btn btn-primary' style={{margin:"20px 0 20px 0",display:"flex",justifyContent:"center"}} href="tournamentsEdit/addtournament">Add Tournament</Link>
        <TournamentsEditList />
    </div>
  )
}

export default page