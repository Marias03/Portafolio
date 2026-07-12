import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import LoadingScreen from "@/components/LoadingScreen";
import AskMaria from "@/components/AskMaria";

export default function HomePage() {
  return (
    <main className="min-h-screen  w-full overflow-x-hidden bg-[#0B0F17] text-white">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <AskMaria />

      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
