
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

const CoupleSection = () => {
  return (
    <section id="couple" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-rose mb-4">
            Our story
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-px bg-wedding-gold"></div>
            <Heart className="text-wedding-rose fill-current w-5 h-5" />
            <div className="w-12 h-px bg-wedding-gold"></div>
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[60vh] px-4">
          {/* Diana&Alex */}
          <Card className="wedding-card p-8 text-center group hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-wedding-rose/20 to-wedding-gold/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-6xl">👩🏻‍❤️‍👨🏻</span>
                </div>
              </div>
            </div>
            <h3 className="font-great-vibes text-3xl text-wedding-gold mb-4">Diana & Alex</h3>
            <p className="text-gray-600 leading-relaxed">
              Buna ziua! Numele meu este Alex și îmi iau bibica de soție! 
              Sunt nerăbdător să încep această aventură minunată alături de Diana.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
