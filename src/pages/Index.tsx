
import { useState, useEffect } from "react";
import { Heart, MapPin, Calendar, Camera, Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import GiftsSection from "@/components/GiftsSection";
import FloatingHeart from "@/components/FloatingHeart";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Floating decorative hearts */}
      <FloatingHeart />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Couple Section */}
      <CoupleSection />
      
      {/* Events Section */}
      <EventsSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* RSVP Section */}
      <RSVPSection />
      
      {/* Gifts Section */}
      <GiftsSection />
      
      {/* Footer */}
      <footer className="bg-wedding-cream py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="text-wedding-rose fill-current w-6 h-6" />
            <span className="font-great-vibes text-2xl text-wedding-gold">Diana & Alex</span>
            <Heart className="text-wedding-rose fill-current w-6 h-6" />
          </div>
          <p className="text-gray-600">5 Septembrie 2025 • Bucharest</p>
          <p className="text-sm text-gray-500 mt-4">
            Cu drag, pentru cei mai dragi oameni din viața noastră
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
