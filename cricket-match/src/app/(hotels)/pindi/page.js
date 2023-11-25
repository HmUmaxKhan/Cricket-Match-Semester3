import Link from "next/link";

const PagePindi = () => {
    return ( 
        <div>
          <h1>Welcome to Twin Cities</h1>

          <Link href="/pindi/shershahhotels" as="/pindi/SherShah">
            Sher Shah Hotels
          </Link>
          <Link href="/pindi/monalhotels" as="/pindi/Monal">
            Monal Hotels
          </Link>
          <Link href="/pindi/quettahotels" as="/pindi/Quetta">
            Quetta Hotels
          </Link>
        </div>
     );
}
 
export default PagePindi;
