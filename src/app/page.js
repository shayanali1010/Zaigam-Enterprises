// src/app/page.js
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
// import Team from '@/components/sections/Team';
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      {/* <Team /> */}
      <ContactForm />
    </>
  );
}
