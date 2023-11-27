import Link from "next/link";

export default function MatchesListItems(props) {
  const {match} = props
  return (
    <div>
    <ul>
        <li>
            <h3>{match.team1} vs {match.team2}</h3>
            <h4>{match.match_time}</h4>
            <h4>{match.match_date.slice(0,10)}</h4>
            <h4>{match.venue_name}</h4>
            <h4>{match.location}</h4>
        </li>
        <Link href={`/hotel/${match.location}`}><h2>Book hotel</h2></Link>
    </ul>      
    </div>
  )
}
