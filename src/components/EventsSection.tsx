
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Heart, Building, PartyPopper } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
  title: "Petrecerea de Cununie",
  date: "5-7 Septembrie 2025",
  location: "Busteni, Prahova, Vila Mama Jana",
  description: `Dragii noștri,
Suntem bucuroși să vă împărtășim detaliile evenimentului nostru special care marchează începutul poveștii noastre împreună!

Cununia civilă – Emoția primului „DA”

🕐 Vineri, 5 Septembrie 2025, ora 13:00

📍 Primăria Bușteni – Bulevardul Libertății 91, Bușteni

Vă așteptăm cu mult drag să fiți alături de noi în momentul în care ne vom spune „DA” în fața ofițerului stării civile. Va fi o ceremonie simplă, dar plină de emoție, unde prezența voastră va însemna enorm pentru noi.

Petrecerea de cununie – 3 zile de poveste

📅 Vineri, 5 Septembrie – Duminică, 7 Septembrie
📍 La Vila Mama Jana – Strada Codrului 2C, Bușteni

După ceremonie, dăm drumul la distracție într-o cabană situată la poalele munților Bucegi, unde vom petrece împreună un weekend întreg.

Ne vom aduna pentru o masă festivă într-un cadru relaxat și plin de voie bună. După ce ne încărcăm cu energie, seara continuă cu petrecere, dansuri și multe surprize. Vom dansa până târziu și vom crea primele amintiri din acest weekend special.

Sâmbătă – Zi de relaxare, jocuri și grătar

🌤 Dimineața: Timp liber și descoperiri

Ziua de sâmbătă o dedicăm relaxării! Vă încurajăm să explorați zona, să vizitați obiectivele turistice din apropiere sau pur și simplu să vă bucurați de natură și de liniște.

🎲 După-amiază: Jocuri de societate & voie bună

Ne adunăm cu toții pentru o porție serioasă de distracție – avem pregătite multe jocuri de grup.

🔥 Seara: Grill & chill

Sâmbăta o încheiem cu un grătar, unde toți punem câte puțin suflet și ne bucurăm împreună de gustul unei seri relaxante, ca între prieteni.

Duminică – Brunch și rămas-bun

🍳 Brunch de rămas-bun

Încheiem acest weekend minunat cu un brunch delicios, numai bun pentru a mai sta la povești și pentru a ne lua rămas-bun pe îndelete.`,
  icon: <PartyPopper className="w-8 h-8 text-wedding-gold" />,
  bgColor: "from-wedding-gold/10 to-wedding-gold/5"
}  ];

  return (
    <section id="events" className="py-20 wedding-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-rose mb-4">
            Eveniment
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-px bg-wedding-gold"></div>
            <Heart className="text-wedding-rose fill-current w-5 h-5" />
            <div className="w-12 h-px bg-wedding-gold"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {events.map((event, index) => (
            <Card key={index} className="wedding-card p-8 group hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br ${event.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {event.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-playfair text-2xl text-wedding-rose mb-4">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
