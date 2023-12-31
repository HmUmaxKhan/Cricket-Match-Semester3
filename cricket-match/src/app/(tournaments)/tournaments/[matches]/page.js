import MatchesList from "../../componenetsofMatches/MatchesList"

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
        <MatchesList matches= {params.matches}/>
    </div>
  )
}
