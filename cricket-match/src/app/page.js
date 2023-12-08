"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    if (!localStorage.getItem("login")) {
      window.location.href = "/login";
    }
  });
  return (
    <main>
      <Link href="/update">Update</Link>
      <br></br>
      <Link href="/tournaments">Tournaments</Link>
    </main>
  );
}
