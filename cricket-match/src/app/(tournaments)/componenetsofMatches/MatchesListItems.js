import Link from "next/link";
import { MdHotel } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";

export default function MatchesListItems(props) {
  const {match} = props;


  const cardStyle={
    maxWidth: "70%", marginLeft: "15%", overflow: "hidden",
    boxShadow:"2px 4px 10px 8px rgba(0, 0, 0, 0.1)"
  }

  return (
    <div className="card mt-5" style={cardStyle}>
  <div className="row g-0">
    <div className="col-sm-6" style={{ overflow: "hidden", transition: "width 0.3s ease" }}>
      {match.img !== null ? (
        <img
          src={`data:image/png;base64, ${match.img}`}
          className="img-fluid rounded-start"
          alt={match.Name}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "10px 0 0 10px",
            objectFit: "cover",
          }}
        />
      ) : (
        <span>No Image Available</span>
      )}
    </div>
    <div className="col-sm-6" style={{ transition: "width 0.3s ease" }}>
      <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3 className="card-title">{match.team1} vs {match.team2}</h3>
        <h5>Match Date: {match.match_date.slice(0, 10)}</h5>
        <h5>Match Time: {match.match_time}</h5>
        <h5>Venue: {match.venue_name}</h5>
        <h5>Location: {match.location}</h5>
        <div>
        <Link style={{marginRight:"30px"}} href={`/hotel/${match.match_id}`}><MdHotel size={40}/></Link>
        <Link  href={`/transport/${match.match_id}`} style={{marginRight:"30px"}} ><FaBus size={40}/></Link>
        <Link  href={`/ticket/${match.match_id}`}><IoTicketSharp size={40}/></Link>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
