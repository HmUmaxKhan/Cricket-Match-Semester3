"use client"
import { withRouter } from "next/router";
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const page = ({router,params}) => {

   const handleRedirect = () => {
    // Use the router to navigate to the desired URL with a leading slash
    router.push(`/tournamentsEdit/matchList/${tournament_id}`);
  };

  const [image,setImage] = useState();
  const [matchDate,setMatchDate] = useState(new Date());
  const [addingDate,setAddingDate] = useState(new Date());
  const [tournament_id,setTournamentId] = useState();

  useEffect(()=>{
    //Getting the previous info
        const info = async()=>{
        let response = await fetch("http://localhost:5005/api/getsinglematch",{
            method:'POST',
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({match_id:params.updatematches})
          });
          response = await response.json();
          console.log(response);

          const { tournament_id,match_id,match_date,match_time,team1,team2,img,AddingDate,venue_name,location } = response;

          setImage(img);
          setAddingDate(new Date(AddingDate));
          setMatchDate(new Date(match_date))

          setTournamentId(tournament_id)

          setReg({
            match_time,
            team1,
            team2,
            img,
            venue_name,
            location
            });

    }

    info();
    },[]);


    const handleAdding = (date)=>{
        const modifiedDate = new Date(date);
        setAddingDate(modifiedDate);
      }
      const handleMatchDate = (date)=>{
        const modifiedDate = new Date(date);
        setMatchDate(modifiedDate);
      }


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
      
    const modifiedAddingDate = new Date(addingDate);
    modifiedAddingDate.setDate(modifiedAddingDate.getDate() + 1);    

    let response = await fetch("http://localhost:5005/api/updatematch",{
      method:'PUT',
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        match_id:params.updatematches,
        match_date:modifiedMatchDate.toISOString().slice(0,10),
        match_time:reg.match_time,
        team1:reg.team1,
        team2:reg.team2,
        img:image,
        AddingDate:modifiedAddingDate.toISOString().slice(0,10),
        venue_name:reg.venue_name,
        location:reg.location
      }),
    });
    response = await response.json();
    console.log(response);
    handleRedirect();
  }

  return (
    <>
    <h1 className="text-center m-4 bg-slate-400">Match Update</h1>
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
              Ending Date:  
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

            <div className="mb-3">
            <label htmlFor="addingDate" className="form-label mr-3">
              Adding Date:  
            </label>
            <ReactDatePicker
             selected={addingDate}
              onChange={handleAdding}
              dateFormat="yyyy-MM-dd"
              className="form-control ml-3"
              id="addingDate"
              name="AddingDate"
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