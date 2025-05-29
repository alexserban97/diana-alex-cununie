
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Heart, Building, PartyPopper } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
      title: "Ceremonia Civilă",
      date: "5 Septembrie 2025, 12:00",
      location: "Primăria Sector 3, București",
      description: "Ne-a invitat Negoiță la el să facem cununie, a spus că dacă venim cu mai mulți prieteni avem șanse să ne dea și un apartament în Hills cadou.",
      icon: <Building className="w-8 h-8 text-wedding-rose" />,
      bgColor: "from-wedding-rose/10 to-wedding-rose/5"
    },
    {
      title: "Petrecerea de Cununie",
      date: "5-7 Septembrie 2025",
      location: "Busteni, Prahova, Vila Mama Jana",
      description: "Ne-am ales locația cu greu, încă nu e bătută în cuie, so mai este timp să ne răzgândim, dar sperăm să ne distrăm ca în filme.",
      icon: <PartyPopper className="w-8 h-8 text-wedding-gold" />,
      bgColor: "from-wedding-gold/10 to-wedding-gold/5"
    }
  ];

  return (
    <section id="events" className="py-20 wedding-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-rose mb-4">
            Evenimente
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
