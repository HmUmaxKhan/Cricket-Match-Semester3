import Link from "next/link";
import TournamentList from "../componentsofTournaments/TournamentList";

export default function page() {
  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  return (
    <div style={background}>
      <TournamentList />
    </div>
  )
}
