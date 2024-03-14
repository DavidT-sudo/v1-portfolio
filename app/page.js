
import Image from "next/image";
import Hero from "./components/Hero.jsx"
import Navbar from "./components/Navbar.jsx"
import AboutSection from "./components/AboutSection.jsx"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col container mx-auto">
			<Navbar />
			<div className="container mt-24 px-12 py-4">
				<Hero />
			</div>
			<AboutSection />
    </main>
  );
}
