import Image from "next/image";
import Link from "next/link";
import { IonIcon } from '@ionic/react';
import arrowRedoCircle from "ionicons"
import { RxUpdate } from "react-icons/rx";

export default function HotelListItems(props) {
    const {hotel} = props
    

    return (
      <div className="card mb-3 mt-3 " style={{ height:"250px",maxWidth: "70%", marginLeft: "15%", overflow: "hidden"}}>
  <div className="row g-0">
    <div className="col-md-6" style={{ overflow: "hidden", transition: "width 0.3s ease" }}>
      {hotel && hotel.WebUrl ? (
        <a href={hotel.WebUrl}>
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
            <span>No Image Available</span>
          )}
        </a>
      ) : (
        <span>No WebUrl Available</span>
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
        <Link href={`adminDashboard/${hotel.hotel_id}`}>
          <RxUpdate size={20}/>
        </Link>
      </div>
    </div>
  </div>
</div>

  )
  }
  