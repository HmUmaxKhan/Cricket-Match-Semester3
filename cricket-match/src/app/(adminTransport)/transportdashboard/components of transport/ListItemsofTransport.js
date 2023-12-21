import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { LiaRouteSolid } from "react-icons/lia";

export default function ListItemsofTransport(props) {
    const {transport,onDelete} = props
    
    const cardStyle={
      height:"250px",maxWidth: "70%", marginLeft: "15%", overflow: "hidden",
      boxShadow:"0 0 10px 8px"
    }

    const handleDelete=async()=>{
      let response = await fetch("http://localhost:5005/api/deletetransport",{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({transport_id:transport.transport_id})
      })

      response = await response.json();

      console.log(response);

      onDelete(transport.hotel_id)
    }

    return (
      <div className="card mb-3 mt-3 " style={cardStyle}>
  <div className="row g-0">
    <div className="col-md-6" style={{ overflow: "hidden", transition: "width 0.3s ease" }}>
          {transport.ImageUrl ? (
            <Image
              src={`data:image/png;base64, ${transport.ImageUrl}`}
              width={500}
              height={300}
              className="img-fluid rounded-start"
              alt={transport.Name}
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
        <h5 className="card-title"><b>{transport.transportName}</b></h5>
        <h6><b>City</b>: {transport.city}</h6>
        <h6><b>Model</b>: {transport.model}</h6>
        <h6><b>Website</b>: <a href={transport.website}>{transport.website}</a></h6>
        <h6><b>Contact No</b>: {transport.contact}</h6>
        <h6><b>Capacity</b>: {transport.capacity}</h6>
        <h6><b>Number Plate</b>: {transport.numberPlate}</h6>
        <div>
        <Link href={`/transportdashboard/${transport.transport_id}`}>
          <RxUpdate size={20}/>
        </Link>

        <Link style={{border:"none",background:"none",marginLeft:"20px"}} href={`adminDashboard/${transport.hotel_id}`}>
          <LiaRouteSolid size={30}/>
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
  