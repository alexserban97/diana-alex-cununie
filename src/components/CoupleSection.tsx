
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
        <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src="/images/Center.jpg"
            alt="Diana și Alex"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </Card>
</div>
<h3 className="font-great-vibes text-3xl text-wedding-gold mb-4">Diana & Alex</h3>

<h3 className="font-great-vibes text-2xl text-wedding-gold mb-4">Holiday romance turned forever</h3>

<p className="text-gray-600 leading-relaxed space-y-4">
  <span className="block mb-4">
    Noi suntem Diana și Alex. Ne-am cunoscut în vara lui 2019 in Michigan, Statele Unite, iar primul nostru date a fost la Cascada Niagara – da, chiar acolo, țin minte că și vorbeam dacă primul date e aici, la următoarele trebuie să o duc pe lună cu Mustangul roșu, cu care am plimbat-o în vara aceea și care era împrumutat.
  </span>

  <span className="block mb-4">
    De atunci am tot descoperit lumea împreună, călătorind prin locuri noi, mereu cu chef de aventură și un apetit pe măsură.
  </span>

  <span className="block mb-4">
   Și uite-așa, într-o zi ne-am trezit logodiți în Mauritius. Nu pe vreo plajă desprinsă din Pinterest, cu apusuri fabuloase și palmieri perfect aliniați, ci pe una liniștită, aproape pustie… pentru că cineva — nu dăm nume, dar începe cu “A” și se termină cu “lex” — n-a mai avut răbdare cu peisajele instagramabile și mi-a cerut mâna exact când emoțiile l-au luat prin surprindere. Stângaci și adorabil, mi-a spus: „Vrei să fii soția mea?”… iar eu, evident, n-am rezistat farmecului lui neplanificat.
  </span>

  <span className="block mb-4">
    Când nu ne facem planuri de plecat prin lume, ne bucurăm de lucruri simple: o masă gătită acasă, o poză reușită, o seară liniștită. Sau dimpotrivă — o petrecere mare cu oamenii noștri dragi.
  </span>

  <span className="block">
    Asta urmează acum: o zi de neuitat, în care celebrăm începutul unei noi etape. Și suntem super bucuroși că faci parte din ea.
  </span>
</p>

          </Card>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
