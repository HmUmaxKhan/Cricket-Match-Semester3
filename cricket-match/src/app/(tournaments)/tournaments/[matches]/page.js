import MatchesList from "../../componenetsofMatches/MatchesList"

export default function page({params}) {

    console.log(params)

  return (
    <div>
    <h1> Match Schedules are following</h1>
        <MatchesList matches= {params.matches}/>
    </div>
  )
}