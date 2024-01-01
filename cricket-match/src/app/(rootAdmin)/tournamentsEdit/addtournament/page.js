"use client"
import Alert from "@/app/(shared components)/Alert";
import { isEndingDate, isStartingDate } from "@/app/(shared components)/validation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const page = () => {

  const router = useRouter();
  const [image,setImage] = useState();
  const [name,setName]=useState()
  const [startDate,setStartDate]=useState(new Date());
  const [endingDate,setEndingDate]=useState(new Date());
  const [addingDate,setAddingDate]=useState(new Date());
  const [user_id,setUserId] = useState();

  const [alert, setAlert] = useState(null);



    const handleImageChange = (e)=>{
      const file = e.target.files[0];
      convertToBase64(file);
    }
  
    useEffect(()=>{
      let details = localStorage.getItem("rootLogin");
      details = JSON.parse(details);
      console.log(details.user_id);
      setUserId(details.user_id)
    },[])

    const convertToBase64 = (file) => {
      const reader = new FileReader();
    
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setImage(base64String);
      };
    
      // Ensure to read the file as data URL
      reader.readAsDataURL(file);
    };

    const handleEnding = (date)=>{
      const modifiedDate = new Date(date);
      setEndingDate(modifiedDate);
    }
    const handleStart = (date)=>{
      const modifiedDate = new Date(date);
      setStartDate(modifiedDate);
    }

    const handleClick = async (e) => {
      e.preventDefault();
    
      const modifiedStartDate = new Date(startDate);
      modifiedStartDate.setDate(modifiedStartDate.getDate() + 1);
    
      const modifiedEndDate = new Date(endingDate);
      modifiedEndDate.setDate(modifiedEndDate.getDate() + 1);

      const modifiedAddingDate = new Date(addingDate);
      modifiedAddingDate.setDate(modifiedAddingDate.getDate() + 1);
      

      if (!isStartingDate(modifiedStartDate)) {
        setAlert({
          msg: "Invalid Statrting Date.",
          type: "danger",
        });
        return;
      }
      if (!isEndingDate(modifiedStartDate,modifiedEndDate)) {
        setAlert({
          msg: "Invalid Ending Date Date.",
          type: "danger",
        });
        return;
      }
        
      let response = await fetch("http://localhost:5005/api/addtournament", {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          TournamentName: name,
          StartingDate: modifiedStartDate.toISOString().slice(0, 10),
          EndingDate: modifiedEndDate.toISOString().slice(0, 10),
          AddingDate: modifiedAddingDate.toISOString().slice(0, 10),
          ImageUrl: image,
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
    <h1 className="text-center m-4 bg-slate-400">Add Tournament</h1>
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
              onChange={handleStart}
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
              onChange={handleEnding}
              dateFormat="yyyy-MM-dd"
              className="form-control ml-3"
              id="endingDate"
              name="EndingDate"
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