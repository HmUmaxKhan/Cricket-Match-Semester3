import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

export default function TournamentsEditListItems (props) {
    const {tournament,onDelete} = props

    
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
        body:JSON.stringify({tournament_id:tournament.tournament_id})
      })

      response = await response.json();

      console.log(response);

      onDelete(tournament.tournament_id)
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
        <h3 className="card-title">{tournament.TournamentName}</h3>
        <h5>Starting Date: {tournament.StartingDate.slice(0,10)}</h5>
        <h5>Ending Date: {tournament.EndingDate.slice(0,10)}</h5>
        <h5>Posting Date: {tournament.AddingDate.slice(0,10)}</h5>
        <div>
        <Link href={`tournamentsEdit/${tournament.tournament_id}`}>
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
  