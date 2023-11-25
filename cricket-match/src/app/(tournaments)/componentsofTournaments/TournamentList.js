import TournamentListItems from "./TournamentListItems";

export default function TournamentList() {

    const list = [
        "T20",
        "ODI",
        "TEST"
    ];

  return (
    <div>
    {
        list.map((item, index) => {
            return(
                {key : index},
                <TournamentListItems tournament = {item} />
            )
        })
    }
    </div>
  )
}
