import MatchesList from "../../componenetsofMatches/MatchesList"

export default function page({params}) {

    console.log(params)

  return (
    <div>
        <MatchesList matches= {params.matches}/>
    </div>
  )
}
