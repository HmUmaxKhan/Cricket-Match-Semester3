import { matchIdaction } from "@/app/redux/slice/matchIdSlice";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useDispatch } from "react-redux";

export default function TicketEditListItems (props) {
    const {ticket,onDelete} = props
    
    const cardStyle={
      height:"250px",
      boxShadow:"0 0 10px 8px"
    }

    const handleDelete=async()=>{
      let response = await fetch("http://localhost:5005/api/deleteticket",{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ticket_id:ticket.ticket_id})
      })

      response = await response.json();

      console.log(response);

      onDelete()
      
    }



    return (
        <div className="col-lg-5 card mt-4 container" style={cardStyle}>
    <div className="mt-3" style={{ transition: "width 0.3s ease" }}>
      <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3 className="card-title">{ticket.Category}</h3>
        <h5><b>Price:</b> {ticket.price}</h5>
        <h5><b>Capacity:</b> {ticket.total_seats}</h5>
        <h5><b>Posting Date: </b>{ticket.AddingDate.slice(0,10)}</h5>
        <div>
        <Link href={`updatetickets/${ticket.ticket_id}`}>
          <RxUpdate size={20}/>
        </Link>
        <button onClick={handleDelete} className="ml-3" style={{border:"none",background:"none",marginLeft:"20px"}} >
            <MdDelete size={20} />
        </button>
        </div>
      </div>
      </div>
      </div>

  )
  }
  