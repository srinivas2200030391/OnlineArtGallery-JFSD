import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Story from "../components/Story";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div className="min-w-full max-w-full">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </div>
  );
}
