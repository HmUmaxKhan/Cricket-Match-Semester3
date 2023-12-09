import TicketLists from "./TicketLists";
import { useEffect, useState } from "react";
function Ticket(props) {
  const [ticketDetails, setticketDetails] = useState([]);
  const [details, setDetails] = useState({});

  const { match_id} = props;

  useEffect(() => {
    let info = localStorage.getItem("login");
    if (!info) {
      window.location.href = "/login";
    }
    info = JSON.parse(info);
    setDetails(info);

    const getInfo = async () => {
      let response = await fetch("http://localhost:5005/api/ticketPrice");
      response = await response.json();
      setticketDetails(response.result);
    };

    getInfo();
  }, []);

  console.log(ticketDetails);
  return (
    <div>
      <h1>Tickets</h1>
      {ticketDetails ? (
        ticketDetails.map((item, index) => {
          return (
            <TicketLists
              key={index}
              match_id={match_id}
              Category={item.Category}
              price={item.price}
              userId={details.user_id}
              token={details.token}
            />
          );
        })
      ) : (
        <h2>No Categories are given</h2>
      )}
    </div>
  );
}

export default Ticket;
