import Link from "next/link";

export default function Home() {
  // /registerAdmin === /adminDashboard
  return (
    <main>
      <Link href="/update">Update</Link>
      <br></br>
      <Link href="/tournaments">Tournaments</Link>
      <br></br>
      <Link href="/registerAdmin">Admin Pannel</Link> 
    </main>
  );
}
