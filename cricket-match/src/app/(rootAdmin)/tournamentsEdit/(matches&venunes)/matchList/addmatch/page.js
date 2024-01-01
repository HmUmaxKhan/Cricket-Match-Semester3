"use client"
import Alert from "@/app/(shared components)/Alert";
import { isStartingDate } from "@/app/(shared components)/validation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from "react-redux";

const page = () => {

  const tournamentId = useSelector((state)=>state.tournamentId.tournament_id);
  const [image,setImage] = useState();
  const [matchDate,setMatchDate] = useState(new Date());
  const [addingDate,setAddingDate] = useState(new Date());
  const [user_id,setUserId] = useState();

  const [alert, setAlert] = useState(null);
  const router = useRouter();

      const handleMatchDate = (date)=>{
        const modifiedDate = new Date(date);
        setMatchDate(modifiedDate);
      }

      useEffect(()=>{
        let details = localStorage.getItem("rootLogin");
        details = JSON.parse(details);
        console.log(details.user_id);
        setUserId(details.user_id)
      },[])


    const handleImageChange = (e)=>{
      const file = e.target.files[0];
      convertToBase64(file);
    }
  
    const convertToBase64 = (file) => {
      const reader = new FileReader();
    
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setImage(base64String);
      };
    
      // Ensure to read the file as data URL
      reader.readAsDataURL(file);
    };
    console.log(tournamentId);

  const [reg, setReg] = useState({

        match_time :"",
        team1  :"",
        team2  :"",
        venue_name  :"",
        location  :""
  });

  const Change = (e)=>{
     setReg({...reg,[e.target.name]:e.target.value})
  }

  const handleClick =async (e) =>{
    e.preventDefault();
    
    const modifiedMatchDate = new Date(matchDate);
    modifiedMatchDate.setDate(modifiedMatchDate.getDate() + 1);

    if (!isStartingDate(modifiedMatchDate)) {
      setAlert({
        msg: "Invalid Statrting Date.",
        type: "danger",
      });
      return;
    }
      
    let response = await fetch("http://localhost:5005/api/addmatches",{
      method:'POST',
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        tournament_id:tournamentId,
        match_date:modifiedMatchDate.toISOString().slice(0,10),
        match_time:reg.match_time,
        team1:reg.team1,
        team2:reg.team2,
        img:image,
        AddingDate:addingDate.toISOString().slice(0,10),
        venue_name:reg.venue_name,
        location:reg.location,
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
    <Alert Alert={alert}/>
    <h1 className="text-center m-4 bg-slate-400">Add Match</h1>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Team1 Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="team1"
                onChange={Change}
                value={reg.team1}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Team2 Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="team2"
                onChange={Change}
                value={reg.team2}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Stadium Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="venue_name"
                onChange={Change}
                value={reg.venue_name}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                City: 
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="location"
                onChange={Change}
                value={reg.location}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Time for Match: 
              </label>
              <input
                type="time"
                className="form-control"
                id="description"
                name="match_time"
                onChange={Change}
                value={reg.match_time}
              />
            </div>

            <div className="mb-3">
            <label htmlFor="endingDate" className="form-label mr-3">
              Match Date:  
            </label>
            <ReactDatePicker
             selected={matchDate}
              onChange={handleMatchDate}
              dateFormat="yyyy-MM-dd"
              className="form-control ml-3"
              id="endingDate"
              name="match_date"
            />
            </div>

           </form>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="form-control"
              accept=".jpeg, .jpg, .png"
              onChange={handleImageChange}
            />
          </div>

          {image && (
            <div className="mb-3">
              <label className="form-label">Image Preview</label>
              <img
                src={`data:image/png;base64,${image}`}
                alt="Preview"
                className="img-thumbnail"
              />
            </div>
          )}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleClick}>
        Submit
      </button>

    </div>
    </>
  );

}
 
export default page;