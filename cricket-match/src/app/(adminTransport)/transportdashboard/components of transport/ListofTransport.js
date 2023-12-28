import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListItemsofTransport from "./ListItemsofTransport";

function ListofTransport() {

    const router = useRouter();

    const [transports,setTransports] = useState({});
    const [render,setRender] = useState();
  useEffect(() => {
    //Getting the previous info

    let details = localStorage.getItem("adminTransLogin");
    if (!details && details === null) {
      router.push("/logintransport");
    }
    details = JSON.parse(details);

    const info = async () => {
      let response = await fetch("http://localhost:5005/api/alltransportinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_id: details.admin_id }),
      });

      response = await response.json();
      console.log(response);
      setTransports(response);
    };

    setRender(false);

    info();
  }, [render]);


  const handleDelete=()=>{
    setRender(true)
  }

  return <div>
  {
    Array.isArray(transports) && transports.length!==0 ? transports.map((item, index) => {
        return(
            {key : index},
            <ListItemsofTransport transport = {item} onDelete={handleDelete}/>
        )
    }):(<h3 className="text-center">No Transports are given</h3>)
}
    </div>;
}

export default ListofTransport;
