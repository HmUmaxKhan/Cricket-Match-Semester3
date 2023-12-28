import Link from "next/link";
import TournamentList from "../componentsofTournaments/TournamentList";

export default function page() {
  const body={
    backgroundColor:"#F3EDE2",
    width:"100%",
    height:"100vh"
  }
  return (
    <div style={body}>
      <TournamentList />
    </div>
  )
}
