import Hero from "../sections/Hero";
import AboutSection from "../sections/AboutSection";
import FeaturedVideoSection from "../sections/FeaturedVideoSection";
import PhilosophySection from "../sections/PhilosophySection";
import ServicesSection from "../sections/ServicesSection";
import AnnouncementsSection from "../sections/AnnouncementsSection";
import SponsorsSection from "../sections/SponsorsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AnnouncementsSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <SponsorsSection />
    </>
  );
}
