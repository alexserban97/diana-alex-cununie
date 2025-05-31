
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Camera } from "lucide-react";

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Toate" },
    { id: "simple", label: "Simple" },
    { id: "funny", label: "Funny" },
    { id: "petreceri", label: "Petreceri" },
    { id: "vacante", label: "Vacanțe" }
  ];

  const photos = [
    // Simple folder photos
    { id: 1, category: ["simple"], src: "/src/lib/images/simple/Simple 1.jpg", alt: "Simple Photo 1" },
    { id: 2, category: ["simple"], src: "/src/lib/images/simple/Simple 2.jpg", alt: "Simple Photo 2" },
    { id: 3, category: ["simple"], src: "/src/lib/images/simple/Simple 3.jpg", alt: "Simple Photo 3" },
    { id: 4, category: ["simple"], src: "/src/lib/images/simple/Simple 4.jpg", alt: "Simple Photo 4" },
    { id: 5, category: ["simple"], src: "/src/lib/images/simple/Simple 5.jpg", alt: "Simple Photo 5" },
    { id: 6, category: ["simple"], src: "/src/lib/images/simple/Simple 6.jpg", alt: "Simple Photo 6" },
    // Zona comentată pentru mai multe poze simple
    // { id: X, category: ["simple"], src: "/src/lib/images/simple/Simple X.jpg", alt: "Simple Photo X" },

    // Funny folder photos
    { id: 7, category: ["funny"], src: "/src/lib/images/funny/Funny 1.jpg", alt: "Funny Photo 1" },
    { id: 8, category: ["funny"], src: "/src/lib/images/funny/Funny 2.jpg", alt: "Funny Photo 2" },
    { id: 9, category: ["funny"], src: "/src/lib/images/funny/Funny 3.jpg", alt: "Funny Photo 3" },
    { id: 10, category: ["funny"], src: "/src/lib/images/funny/Funny 4.jpg", alt: "Funny Photo 4" },
    // Zona comentată pentru mai multe poze funny
    // { id: X, category: ["funny"], src: "/src/lib/images/funny/Funny X.jpg", alt: "Funny Photo X" },

    // Petreceri folder photos
    { id: 11, category: ["petreceri"], src: "/src/lib/images/petreceri/Petreceri 1.jpg", alt: "Petreceri Photo 1" },
    { id: 12, category: ["petreceri"], src: "/src/lib/images/petreceri/Petreceri 2.jpg", alt: "Petreceri Photo 2" },
    { id: 13, category: ["petreceri"], src: "/src/lib/images/petreceri/Petreceri 3.jpg", alt: "Petreceri Photo 3" },
    { id: 14, category: ["petreceri"], src: "/src/lib/images/petreceri/Petreceri 4.jpg", alt: "Petreceri Photo 4" },
    // Zona comentată pentru mai multe poze petreceri
    // { id: X, category: ["petreceri"], src: "/src/lib/images/petreceri/Petreceri X.jpg", alt: "Petreceri Photo X" },

    // Vacante folder photos
    { id: 15, category: ["vacante"], src: "/src/lib/images/vacante/Vacante 1.jpg", alt: "Vacante Photo 1" },
    { id: 16, category: ["vacante"], src: "/src/lib/images/vacante/Vacante 2.jpg", alt: "Vacante Photo 2" },
    { id: 17, category: ["vacante"], src: "/src/lib/images/vacante/Vacante 3.jpg", alt: "Vacante Photo 3" },
    { id: 18, category: ["vacante"], src: "/src/lib/images/vacante/Vacante 4.jpg", alt: "Vacante Photo 4" },
    // Zona comentată pentru mai multe poze vacante
    // { id: X, category: ["vacante"], src: "/src/lib/images/vacante/Vacante X.jpg", alt: "Vacante Photo X" },
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
