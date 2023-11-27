import Link from "next/link";

export default function TournamentListItems(props) {
  const {tournament} = props
  return (
    <div>
    <ul>
        <li>
            <Link href={`tournaments/${tournament.tournament_id}`}><h3>{tournament.TournamentName}</h3></Link>
            <li><span><b>Starting Date: </b></span>{(tournament.StartingDate).slice(0,10)}</li>
            <li><span><b>Ending Date: </b></span>{tournament.EndingDate.slice(0,10)}</li>
        </li>
    </ul>      
    </div>
  )
}
