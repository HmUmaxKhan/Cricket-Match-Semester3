import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

export default function PackagesListItems (props) {
    const {packages,onDelete} = props

    
    const cardStyle={
      height:"250px",
      boxShadow:"0 0 10px 8px"
    }

    const handleDelete=async()=>{
      let response = await fetch("http://localhost:5005/api/deletepackage",{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({package_id:packages.package_id})
      })

      response = await response.json();

      console.log(response);

      onDelete(packages.package_id)
    }



    return (
        <div className="col-lg-5 card mt-4 container" style={cardStyle}>
    <div className="mt-3" style={{ transition: "width 0.3s ease" }}>
      <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3 className="card-title">{packages.packageName}</h3>
        <h5><b>Category:</b> {packages.packageName}</h5>
        <h5><b>Duration In Days:</b> {packages.DurationInDays}</h5>
        <h5><b>Price: </b>{packages.packageFee}</h5>
        <h5><b>Posting Date: </b>{packages.AddingDate.slice(0,10)}</h5>
        <div>
        <Link href={`/packages/${packages.package_id}`}>
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
  