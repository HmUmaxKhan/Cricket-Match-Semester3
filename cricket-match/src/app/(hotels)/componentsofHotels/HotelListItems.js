export default function HotelListItems(props) {
  const {hotel} = props
  return (
    <div>
    <ul>
        <li>
        {hotel && hotel.WebUrl && (
            <a href={hotel.WebUrl}><h3>{hotel.Name}</h3></a>
        )}
            <h4>{hotel.City}</h4>
            <h4>{hotel.PhoneNumber}</h4>
            <h4>{hotel.Email}</h4>

        </li>
    </ul>      
    </div>
  )
}
