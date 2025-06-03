
import { Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative wedding-gradient"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-wedding-rose/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-wedding-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in-up">
          {/* Names */}
          <h1 className="font-great-vibes text-6xl md:text-8xl text-wedding-rose mb-6 animate-float">
            Diana & Alex
          </h1>
          
          {/* Decorative element */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-16 h-px bg-wedding-gold"></div>
            <Heart className="text-wedding-rose fill-current w-8 h-8 animate-pulse" />
            <div className="w-16 h-px bg-wedding-gold"></div>
          </div>
          
          {/* Date */}
          <p className="font-playfair text-2xl md:text-3xl text-gray-700 mb-4">
            5<sup className="text-lg">th</sup> Septembrie, 2025
          </p>
          
          {/* Location */}
          <p className="text-lg text-gray-600 mb-8">
            Bușteni, Prahova
          </p>
          
          {/* Subtitle */}
          <p className="font-great-vibes text-3xl text-wedding-gold max-w-2xl mx-auto">
            Vă invităm să fiți alături de noi în una din cele mai frumoasă zile din viața noastră
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
