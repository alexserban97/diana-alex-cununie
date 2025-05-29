
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Camera } from "lucide-react";

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Toate" },
    { id: "vacation", label: "Vacanțe" },
    { id: "party", label: "Petreceri" },
    { id: "ceremony", label: "Ceremonii" },
    { id: "wedding", label: "Nuntă" }
  ];

  const photos = [
    { id: 1, category: ["vacation", "ceremony"], src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400", alt: "Vacation Photo 1" },
    { id: 2, category: ["party", "wedding"], src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", alt: "Party Photo 1" },
    { id: 3, category: ["vacation"], src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400", alt: "Vacation Photo 2" },
    { id: 4, category: ["party", "vacation"], src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400", alt: "Party Photo 2" },
    { id: 5, category: ["vacation"], src: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400", alt: "Vacation Photo 3" },
    { id: 6, category: ["wedding", "ceremony", "party"], src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400", alt: "Wedding Photo 1" },
    { id: 7, category: ["vacation"], src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400", alt: "Vacation Photo 4" },
    { id: 8, category: ["wedding", "party"], src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400", alt: "Wedding Photo 2" },
  ];

  const filteredPhotos = activeFilter === "all" 
    ? photos 
    : photos.filter(photo => photo.category.includes(activeFilter));

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-rose mb-4">
            Galeria Foto
          </h2>
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="w-12 h-px bg-wedding-gold"></div>
            <Heart className="text-wedding-rose fill-current w-5 h-5" />
            <div className="w-12 h-px bg-wedding-gold"></div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={`transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? "bg-wedding-rose hover:bg-wedding-rose-dark text-white" 
                    : "border-wedding-rose text-wedding-rose hover:bg-wedding-rose hover:text-white"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
