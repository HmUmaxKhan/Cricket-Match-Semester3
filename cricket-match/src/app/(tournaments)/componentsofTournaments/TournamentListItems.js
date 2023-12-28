import Link from "next/link";
import Image from "next/image";
import { GiCricketBat } from "react-icons/gi";

export default function TournamentListItems(props) {
  const {tournament} = props

  const cardStyle={
    maxWidth: "70%", marginLeft: "15%", overflow: "hidden",
    boxShadow:"0 0 10px 8px rgba(0, 0, 0, 0.1)"
  }

  return (
    <div className="card mb-3 mt-5 " style={cardStyle}>
  <div className="row g-0">
    <div className="col-md-6" style={{ overflow: "hidden", transition: "width 0.3s ease" }}> 
          {tournament.ImageUrl !==null ? (
            <Image
              src={`data:image/png;base64, ${tournament.ImageUrl}`}
              width={500}
              height={300}
              className="img-fluid rounded-start"
              alt={tournament.Name}
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
        <h3 className="card-title mb-3 mt-4">{tournament.TournamentName}</h3>
        <h5 className="mb-3">Starting Date: {tournament.StartingDate.slice(0,10)}</h5>
        <h5 className="mb-3">Ending Date: {tournament.EndingDate.slice(0,10)}</h5>
        <Link href={`tournaments/${tournament.tournament_id}`}><GiCricketBat size={50}/></Link>
      </div>
    </div>
  </div>
</div>

  )
}
