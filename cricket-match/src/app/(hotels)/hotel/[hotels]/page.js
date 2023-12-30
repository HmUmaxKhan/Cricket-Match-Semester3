import HotelsList from "../../componentsofHotels/HotelsList"

export default function page({params}) {

    console.log(params)

    const background= {
      backgroundImage : 'url("/bgImage.jpg")',
      backgroundSize:'cover',
      minHeight:'100vh',
      width:'100%'
    }

  return (
    <div style={background}>
    <h1> Hotels Schedules are following</h1>
        <HotelsList hotels= {params.hotels}/>
    </div>
  )
}

