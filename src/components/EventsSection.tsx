
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Heart, Building, PartyPopper } from "lucide-react";

const EventsSection = () => {
  const events = [
   {
  title: "Petrecerea de Cununie",
  date: "5-7 Septembrie 2025",
  location: "Bușteni, Prahova, Vila Mama Jana",
  description: (
    <div className="space-y-4 text-base leading-relaxed font-roboto">
      <p><strong>Dragii noștri,</strong></p>
      <p>
        Suntem bucuroși să vă împărtășim detaliile evenimentului nostru special care marchează începutul poveștii noastre împreună!
      </p>

      <p className="font-semibold">Cununia civilă – Emoția primului „DA”</p>
      <p>🕐 <strong>Vineri, 5 Septembrie 2025, ora 14:00</strong></p>
      <p>📍 Primăria Bușteni – Bulevardul Libertății 91, Bușteni</p>
      <p>
        Vă așteptăm cu mult drag să fiți alături de noi în momentul în care ne vom spune „DA” în fața ofițerului stării civile.
        Va fi o ceremonie simplă, dar plină de emoție, unde prezența voastră va însemna enorm pentru noi.
      </p>

      <p className="font-semibold">Petrecerea de cununie – 3 zile de poveste</p>
      <p>📅 Vineri, 5 Septembrie – Duminică, 7 Septembrie</p>
      <p>
  📍{" "}
  <a
    href="https://maps.app.goo.gl/A3t84yUgShjbjb3B8"
    target="_blank"
    rel="noopener noreferrer"
    className="text-wedding-gold underline hover:text-wedding-gold/80"
  >
    La Vila Mama Jana – Strada Codrului 2C, Bușteni
  </a>
</p>  
      <p className="font-semibold">Vineri – Ceremonie Civilă și Petrecere</p>
      <p>
        După ceremonie, dăm drumul la distracție într-o cabană situată la poalele munților Bucegi,
        unde vom petrece împreună un weekend întreg.
      </p>
      <p>
        Ne vom aduna pentru o masă festivă într-un cadru relaxat și plin de voie bună.
        După ce ne încărcăm cu energie, seara continuă cu petrecere, dansuri și multe surprize.
        Vom dansa până târziu și vom crea primele amintiri din acest weekend special.
      </p>

      <p className="font-semibold">Sâmbătă – Zi de relaxare, jocuri, grătar și socializare</p>
      <p>🌤 <strong>Dimineața:</strong> Timp liber și descoperiri</p>
      <p>
        Ziua de sâmbătă o dedicăm relaxării! Vă încurajăm să explorați zona, să vizitați obiectivele turistice
        din apropiere sau pur și simplu să vă bucurați de natură și de liniște, eventual cu un pahar de bere în mână.
      </p>

      <p>🎲 <strong>După-amiază:</strong> Jocuri de societate & voie bună</p>
      <p>
        Ne adunăm cu toții pentru o porție serioasă de distracție – avem multe jocuri de societate.
      </p>

      <p>🔥 <strong>Seara:</strong> Grill & chill</p>
      <p>
        Sâmbăta o încheiem cu un grătar, unde toți punem câte puțin suflet și ne bucurăm împreună
        de gustul unei seri relaxante, ca între prieteni.
      </p>

      <p className="font-semibold">Duminică – Brunch și rămas-bun</p>
      <p>🍳 <strong>Brunch de rămas-bun</strong></p>
      <p>
        Încheiem acest weekend minunat cu un brunch delicios, numai bun pentru a mai sta la povești
        și pentru a ne lua rămas-bun pe îndelete.
      </p>
    </div>
  ),
  icon: <PartyPopper className="w-8 h-8 text-wedding-gold" />,
  bgColor: "from-wedding-gold/10 to-wedding-gold/5"
}
  ];

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
