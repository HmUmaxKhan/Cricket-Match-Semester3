import HotelsList from "../../componentsofHotels/HotelsList"

export default function page({params}) {

    console.log(params)

  return (
    <div>
    <h1> Hotels Schedules are following</h1>
        <HotelsList hotels= {params.hotels}/>
    </div>
  )
}

