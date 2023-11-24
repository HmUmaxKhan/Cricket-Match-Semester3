"use client"
import { useEffect, useState } from "react";

const HotelsNames = ({ params }) => {
  const [hostelNames, setHostelNames] = useState({
    Hotel1Name: "",
    Hotel1Capacity: 0,
    Hotel2Name: "",
    Hotel2Capacity: 0,
    Hotel3Name: "",
    Hotel3Capacity: 0,
    Hotel4Name: "",
    Hotel4Capacity: 0,
  });

  useEffect(() => {
    if (!localStorage.getItem("login")) {
      window.location.href = "/login";
    } else {
      const userDetails = JSON.parse(localStorage.getItem("login"));
      console.log(userDetails.token);

      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5005/api/city/listofhotels", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "auth-token": userDetails.token
            },
            body: JSON.stringify({
              city: params.cities
            })
          });

          const data = await response.json();
          if (data && data.Details) {
            setHostelNames(data.Details);
          } else {
            console.error("Data or Details object not available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [params.cities]);

  return (
    <div>
      <h1>{params.cities}</h1>
      <ul>
        <li>{hostelNames.Hotel1Name}   {hostelNames.Hotel1Capacity}</li>
        <li>{hostelNames.Hotel2Name}   {hostelNames.Hotel2Capacity}</li>
        <li>{hostelNames.Hotel3Name}   {hostelNames.Hotel3Capacity}</li>
        <li>{hostelNames.Hotel4Name}   {hostelNames.Hotel4Capacity}</li>
      </ul>
    </div>
  );
};

export default HotelsNames;

