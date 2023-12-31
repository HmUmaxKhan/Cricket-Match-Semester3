import {ticketDetail } from "@/app/redux/slice/ticketPriceSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ListItemsofTickets(props) {
  const { ticket, matchId, userId } = props;
console.log(userId);
  const cardStyle = {
    boxShadow: "0 0 10px 8px rgba(0,0,0,0.1)",
  };
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value, 10));
  };

  const handleClick = () => {
    dispatch(ticketDetail({
      ticketPrice:ticket.price,
      ticketCategory:ticket.Category,
      matchId:matchId,
      userId:userId,
      ticketId:ticket.ticket_id}));
    router.push("paymentticket")
  };

  return (
    <div className="col-lg-5 card mt-4 container" style={cardStyle}>
      <div className="mt-3" style={{ transition: "width 0.3s ease" }}>
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3 className="card-title">{ticket.Category}</h3>
          <h5>
            <b>Price:</b> {ticket.price}
          </h5>
          <h5>
            <b>Capacity:</b> {ticket.total_seats}
          </h5>

          <button onClick={handleClick} className="btn btn-primary">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
