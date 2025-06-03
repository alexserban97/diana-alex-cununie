
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import GiftsSection from "@/components/GiftsSection";
import { usePageTracking } from "@/hooks/usePageTracking";

const Index = () => {
  // Track page visits automatically
  usePageTracking();

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CoupleSection />
      <EventsSection />
      <GallerySection />
      <RSVPSection />
      <GiftsSection />
    </div>
  );
};

export default Index;
