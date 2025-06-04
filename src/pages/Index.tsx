
import { CoupleSection } from '@/components/CoupleSection';
import { EventsSection } from '@/components/EventsSection';
import { GallerySection } from '@/components/GallerySection';
import { GiftsSection } from '@/components/GiftsSection';
import { HeroSection } from '@/components/HeroSection';
import { Navigation } from '@/components/Navigation';
import { RSVPSection } from '@/components/RSVPSection';
import { usePageTracking } from '@/hooks/usePageTracking';
import { useEffect, useState } from 'react';

const Index = () => {
  // Add page tracking
  usePageTracking();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <Navigation />
      <HeroSection />
      <CoupleSection />
      <EventsSection />
      <GallerySection />
      <GiftsSection />
      <RSVPSection />
    </div>
  );
};

export default Index;
