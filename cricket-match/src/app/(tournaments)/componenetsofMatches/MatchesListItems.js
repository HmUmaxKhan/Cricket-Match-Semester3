import Link from "next/link";

export default function MatchesListItems(props) {
  const {match} = props
  return (
    <div>
    <ul>
        <li>
            <Link href={`matches/${match.matches_id}`}><h3>{match.team1} vs {match.team2}</h3></Link>
            <h4>{match.match_time}</h4>
            <h4>{match.match_date.slice(0,10)}</h4>
            <h4>{match.venue_name}</h4>
            <h4>{match.location}</h4>
        </li>
    </ul>      
    </div>
  )
}
