
export default function ListItemsHistory (props) {
    const {history} = props
    
    const cardStyle={
      height:"250px",
      boxShadow:"0 0 10px 8px"
    }



    return (
        <div className="col-lg-5 card mt-4 container" style={cardStyle}>
    <div className="mt-3" style={{ transition: "width 0.3s ease" }}>
      <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3 className="card-title">{history.action_type}</h3>
        <h5><b>Change in:</b> {history.table_name}</h5>
        <h5><b>Name of the Change:</b> {history.action_name}</h5>
        <h5><b>Changed by: </b>{history.UserName}</h5>
        <h5><b>Changing Date: </b>{history.formatted_action_timestamp.slice(0,10)}</h5>
        <h5><b>Changing Time: </b>{history.formatted_action_timestamp.slice(11)}</h5>
      </div>
      </div>
      </div>

  )
  }
  