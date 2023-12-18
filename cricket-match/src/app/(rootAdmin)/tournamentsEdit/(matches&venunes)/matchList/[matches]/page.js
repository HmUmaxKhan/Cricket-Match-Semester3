import React from 'react'
import MatchesEditList from '../MatchesList/MatchesEditList'

function page(params) {
  console.log(params.params.matches);
  return (
    <div>
        <MatchesEditList t_id = {params.params.matches}/>
    </div>
  )
}

export default page