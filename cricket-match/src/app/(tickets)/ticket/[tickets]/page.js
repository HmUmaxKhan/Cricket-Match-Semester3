import ListofTickets from "../componentsoFtikets/ListofTickets";

export default function page({params}) {

  console.log(params.tickets);

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }

  return (
    <div style={background}>
      <ListofTickets matchId = {params.tickets}/>
    </div>
  )
}
