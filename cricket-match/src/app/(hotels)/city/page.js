import Link from "next/link";

const HostelsList = () => {
    return ( 
        <div>
         <Link href="/lhr">Lahore</Link>
         <br></br>

         <Link href="/karachi">Karachi</Link>
         <br></br>

         <Link href="/multan">Multan</Link>
         <br></br>

         <Link href="/pindi">Twin Cities</Link>
         <br></br>
        </div>
     );
}
 
export default HostelsList;