import Link from "next/link";
import Navbar from "./(shared components)/Navbar";
import Carousel from "./(shared components)/Carousel";
import MidSec from "./(shared components)/MidSec";
import MidSec2 from "./(shared components)/MidSec2";
import Pricing from "./(shared components)/(PricingBus)/Pricing";
import Footer from "./(shared components)/Footer";


export default function Home() {
  // /registerAdmin === /adminDashboard
  return (
    <main>
    <Navbar />
    <Carousel />
    <MidSec/>
    <MidSec2 />
    <Pricing />
    <Footer />
    </main>
  );
}
