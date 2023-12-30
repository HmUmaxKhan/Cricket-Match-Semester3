import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { LiaRouteSolid } from "react-icons/lia";


function TransportListItems(props) {
    const {transport} = props
    const cardStyle={
        maxWidth: "70%", marginLeft: "15%", overflow: "hidden",
        boxShadow:"0 0 10px 8px rgba(0,0,0,0.01)"
      }
  return (
    <div>
    <div className="card mt-3 " style={cardStyle}>
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
      </div>
      <small className='text-body-secondary'>Check the Routes and their Fare</small>
      <Link href={`/route/${transport.transport_id}`}><LiaRouteSolid size={40}/></Link>

    </div>
  </div>
</div>

    </div>
  )
}

export default TransportListItems