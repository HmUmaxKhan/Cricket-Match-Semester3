"use client"
import Alert from "@/app/(shared components)/Alert";
import { isNumberPositive } from "@/app/(shared components)/validation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from "react-redux";

const page = () => {

  const [tournament_id,setTournamentId] = useState();
  const [user_id,setUserId] = useState();

  const router = useRouter()
  const cardStyle={
    boxShadow:"0 0 10px 8px"
  }
  const [alert, setAlert] = useState(null);


  useEffect(()=>{
    let details = localStorage.getItem("rootLogin");
    details = JSON.parse(details);
    console.log(details.user_id);
    setUserId(details.user_id)
  },[])


  const [reg, setReg] = useState({

    Category:"",
    price:"",
    total_seats:"",
    });

  const Change = (e)=>{
    setReg({...reg,[e.target.name]:e.target.value})
  }

  const match_id = useSelector((state)=>state.matchId.match_id)

  console.log(match_id);

  const handleClick =async (e) =>{
    e.preventDefault();
    const modifiedadd = new Date();
    modifiedadd.setDate(modifiedadd.getDate()+1);  

    if (!isNumberPositive(reg.price)) {
      setAlert({
        msg: "Price must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }
    if (!isNumberPositive(reg.total_seats)) {
      setAlert({
        msg: "Total Seats must be greater than 0 and contains only numbers",
        type: "danger",
      });
      return;
    }

    let response = await fetch("http://localhost:5005/api/addtickets",{
      method:'POST',
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        match_id:match_id,
        Category : reg.Category,
        price:reg.price,
        total_seats:reg.total_seats,
        AddingDate: modifiedadd.toISOString().slice(0,10),
        user_id:user_id
      }),
    });
    response = await response.json();
    console.log(response);
    setAlert({
      msg: response.Msg,
      type: response.success ? 'success' : 'danger',
    });

    setTimeout(() => {
      setAlert(null);
    }, 5000);

    if (response.success) {
      setTimeout(() => {
        setAlert(null);
        router.back();
      }, 3000);
    }
  }

  return (
    <>
    <Alert Alert={alert} />
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
          <div className="card p-4"  style={cardStyle}>
            <h3 className=" py-3 text-center">Add ticket details</h3>
            <div className="mb-3">
              <label htmlFor="Fname" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="Fname"
                placeholder="Enter your first name"
                name="Category"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="Lname" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="Lname"
                placeholder="Enter your last name"
                name="price"
                onChange={Change}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                Total Seats
              </label>
              <input
                type="text"
                className="form-control"
                id="UserName"
                placeholder="Choose a username"
                name="total_seats"
                onChange={Change}
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleClick}>
              Submit
            </button>
          </div>
        </div>
        </>
  );

}
 
export default page;