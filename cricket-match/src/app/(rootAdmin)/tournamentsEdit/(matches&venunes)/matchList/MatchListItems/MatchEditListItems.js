import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

export default function MatchEditListItems (props) {
    const {match,onDelete} = props

    
    const cardStyle={
      height:"250px",maxWidth: "70%", marginLeft: "15%", overflow: "hidden",
      boxShadow:"0 0 10px 8px"
    }

    const handleDelete=async()=>{
      let response = await fetch("http://localhost:5005/api/deletetournament",{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({tournament_id:match.tournament_id})
      })

      response = await response.json();

      console.log(response);

      onDelete(match.tournament_id)
    }

    return (
      <div className="card mb-3 mt-5 " style={cardStyle}>
  <div className="row g-0">
    <div className="col-md-6" style={{ overflow: "hidden", transition: "width 0.3s ease" }}> 
          {match.img !==null ? (
            <Image
              src={`data:image/png;base64, ${match.img}`}
              width={500}
              height={300}
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
      )
    </div>
    <div className="col-md-6" style={{ transition: "width 0.3s ease" }}>
      <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3 className="card-title">{match.team1} vs {match.team2}</h3>
        <h5>Match Date: {match.match_date.slice(0,10)}</h5>
        <h5>Match Time: {match.match_time}</h5>
        <h5>Venue: {match.venue_name}</h5>
        <h5>Location: {match.location}</h5>
        <h5>Posting Date: {match.AddingDate.slice(0,10)}</h5>
        <div>
        <Link href={`updatematches/${match.match_id}`}>
          <RxUpdate size={20}/>
        </Link>
        <button onClick={handleDelete} className="ml-3" style={{border:"none",background:"none",marginLeft:"20px"}} >
            <MdDelete size={20} />
        </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
  }
  