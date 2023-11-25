import Link from "next/link";
import TournamentList from "../componentsofTournaments/TournamentList";

export default function page() {
  return (
    <div>
      <h1>Lists of Tournaments</h1>
      <TournamentList />
    </div>
  )
}
