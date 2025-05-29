
import { Heart } from "lucide-react";

const FloatingHeart = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Heart 
        className="absolute top-1/4 left-1/4 text-wedding-rose/20 fill-current w-6 h-6 animate-float" 
        style={{ animationDelay: "0s" }}
      />
      <Heart 
        className="absolute top-1/3 right-1/3 text-wedding-gold/20 fill-current w-4 h-4 animate-float" 
        style={{ animationDelay: "2s" }}
      />
      <Heart 
        className="absolute bottom-1/4 left-1/3 text-wedding-rose/15 fill-current w-5 h-5 animate-float" 
        style={{ animationDelay: "1s" }}
      />
      <Heart 
        className="absolute bottom-1/3 right-1/4 text-wedding-gold/15 fill-current w-3 h-3 animate-float" 
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
};

export default FloatingHeart;
