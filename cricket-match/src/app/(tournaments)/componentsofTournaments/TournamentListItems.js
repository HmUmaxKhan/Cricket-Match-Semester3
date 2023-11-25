import Link from "next/link";

export default function TournamentListItems(props) {
    const { tournament } = props;
  return (
    <div>
    <ul>
        <li>
            <Link href={"tournaments/"+tournament}><h3>{tournament}</h3></Link>
        </li>
    </ul>      
    </div>
  )
}
