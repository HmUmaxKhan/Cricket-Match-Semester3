import React from 'react'

function ListItemsRoute(props) {
    const {route} = props;

    const cardStyle = {
        height:"250px"
        ,boxShadow: "0 0 10px 8px rgba(0,0,0,0.1)",
      };
    

  return (
    <div className=" card mt-4 container" style={cardStyle}>
    <div className="col-md-6 mt-3" style={{ transition: "width 0.3s ease" }}>
      <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3 className="card-title">{route.stop}</h3>
        <h5><b>Arrival Time</b> {route.arrival_time}</h5>
        <h5><b>Fare:</b> {route.fare}</h5>
        <h5><b>Stop : </b>{route.stop_number}</h5>
      </div>
      </div>
      </div>

  )
}

export default ListItemsRoute