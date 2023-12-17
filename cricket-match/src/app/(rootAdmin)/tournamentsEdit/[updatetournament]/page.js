"use client"
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const page = (params) => {

  const [image,setImage] = useState();
  const [name,setName]=useState()
  const [startDate,setStartDate]=useState(new Date());
  const [endingDate,setEndingDate]=useState(new Date());
  const [addingDate,setAddingDate]=useState(new Date());

  console.log(params.params.updatetournament);
  useEffect(()=>{
    //Getting the previous info
        const info = async()=>{
        let response = await fetch("http://localhost:5005/api/getsingletournaments",{
            method:'POST',
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({tournament_id:params.params.updatetournament})
          });
          response = await response.json();
          console.log(response);

          const { TournamentName,StartingDate,EndingDate,AddingDate,ImageUrl } = response;

          setImage(ImageUrl);
          setStartDate(new Date(StartingDate.slice(0,10)))
          setEndingDate(new Date(EndingDate.slice(0,10)))
          setAddingDate(new Date(AddingDate));
          setName(TournamentName)

    }

    info();
    },[]);


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

  const handleClick =async (e) =>{
    e.preventDefault();
    let response = await fetch("http://localhost:5005/api/updatetournament",{
      method:'PUT',
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        tournament_id:params.params.updatetournament,
        TournamentName:name
        ,StartingDate:startDate
        ,EndingDate:endingDate
        ,AddingDate:addingDate
        ,ImageUrl:image
      }),
    });
    response = await response.json();
    console.log(response);
    window.location.href="/tournamentsEdit"
  }

  return (
    <>
    <h1 className="text-center m-4 bg-slate-400">Update Tournament Details</h1>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name of Tournament
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="Name"
                onChange={(e)=>setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="mb-3">
            <label htmlFor="startDate" className="form-label mr-3">
              Starting Date:  
            </label>
            <ReactDatePicker
             selected={startDate}
              onChange={(date)=>setStartDate(date.getDate()+1)}
              dateFormat="yyyy-MM-dd"
              className="form-control ml-3"
              id="startDate"
              name="StartingDate"
            />
            </div>
            
            <div className="mb-3">
            <label htmlFor="endingDate" className="form-label mr-3">
              Ending Date:  
            </label>
            <ReactDatePicker
             selected={endingDate}
              onChange={(date)=>setEndingDate(date.getDate()+1)}
              dateFormat="yyyy-MM-dd"
              className="form-control ml-3"
              id="endingDate"
              name="EndingDate"
            />
            </div>

            <div className="mb-3">
            <label htmlFor="addingDate" className="form-label mr-3">
              Adding Date:  
            </label>
            <ReactDatePicker
             selected={addingDate}
              onChange={(date)=>setAddingDate(date.getDate()+1)}
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