import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import LoadingScreen from "@/components/LoadingScreen";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-white">
      <LoadingScreen />
      <Navbar />
      <Hero />

      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
