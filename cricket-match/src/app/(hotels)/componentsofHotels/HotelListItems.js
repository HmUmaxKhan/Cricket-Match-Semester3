import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

export default function HotelListItems(props) {
  const {hotel} = props
  const cardStyle={
    maxWidth: "70%", marginLeft: "15%", overflow: "hidden",
    boxShadow:"2px 4px 10px 8px rgba(0, 0, 0, 0.1)"
  }
  return (
    <div className="card mt-3 " style={cardStyle}>
  <div className="row g-0">
    <div className="col-md-6" style={{ overflow: "hidden", transition: "width 0.3s ease" }}>
          {hotel.ImageUrl ? (
            <Image
              src={`data:image/png;base64, ${hotel.ImageUrl}`}
              width={500}
              height={300}
              className="img-fluid rounded-start"
              alt={hotel.Name}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "10px 0 0 10px",
                objectFit: "cover",
              }}
            />
      ) : (
        <span>No Picture is available</span>
      )}
    </div>
    <div className="col-md-6" style={{ transition: "width 0.3s ease" }}>
      <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3 className="card-title">{hotel.Name}</h3>
        <h5>Room Price: {hotel.RoomPrice}</h5>
        <h5>No. of Rooms: {hotel.RoomCapacity}</h5>
        <h5>City: {hotel.City}</h5>
        <h5>Contact No: {hotel.PhoneNumber}</h5>
        <h5>Email: {hotel.Email}</h5>
        <a href={`/${hotel.WebUrl?hotel.WebUrl:""}`}> <FaExternalLinkSquareAlt size={40}/> </a>
      </div>
    </div>
  </div>
</div>

  )
}
