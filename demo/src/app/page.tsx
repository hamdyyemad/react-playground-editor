import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import Installation from "@/components/Installation";
import Usage from "@/components/Usage";
import API from "@/components/API";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900 text-dark-100">
      <Header />
      <Hero />
      <Features />
      <Demo />
      <Installation />
      <Usage />
      <API />
      <Footer />
    </main>
  );
}
