import Link from "next/link";

const HostelsList = () => {
    return ( 
        <div>
         <Link href="/city/lahore">Lahore</Link>
         <br></br>

         <Link href="/city/karachi">Karachi</Link>
         <br></br>

         <Link href="/city/multan">Multan</Link>
         <br></br>

         <Link href="/city/rawalpindi">Twin Cities</Link>
         <br></br>
        </div>
     );
}
 
export default HostelsList;