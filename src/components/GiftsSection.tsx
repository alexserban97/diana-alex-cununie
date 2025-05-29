
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Gift, Mail, User, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface GiftItem {
  id: string;
  name: string;
  image: string;
  link?: string;
  quantity: number;
  row: number;
}

const GiftsSection = () => {
  const [showGifts, setShowGifts] = useState(false);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  // Mock data for demonstration
  const mockGifts: GiftItem[] = [
    {
      id: "1",
      name: "Set de Vase din Ceramică",
      image: "https://images.unsplash.com/photo-1586627544021-2850dd4e1d79?w=300",
      link: "https://example.com",
      quantity: 1,
      row: 1
    },
    {
      id: "2",
      name: "Aspirator Robot",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
      link: "https://example.com",
      quantity: 1,
      row: 2
    },
    {
      id: "3",
      name: "Set de Cearceafuri de Lux",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300",
      link: "https://example.com",
      quantity: 2,
      row: 3
    },
    {
      id: "4",
      name: "Cafetieră Espresso",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
      link: "https://example.com",
      quantity: 1,
      row: 4
    },
    {
      id: "5",
      name: "Set de Prosoapele de Baie",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300",
      link: "https://example.com",
      quantity: 3,
      row: 5
    },
    {
      id: "6",
      name: "Blender de Bucătărie",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300",
      link: "https://example.com",
      quantity: 1,
      row: 6
    }
  ];

  const loadGifts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const availableGifts = mockGifts.filter(gift => gift.quantity > 0);
      setGifts(availableGifts);
    } catch (error) {
      toast.error("Eroare la încărcarea cadourilor");
    } finally {
      setLoading(false);
    }
  };

  const handleShowGifts = () => {
    setShowGifts(true);
    loadGifts();
  };

  const selectGift = (gift: GiftItem) => {
    setSelectedGift(gift);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Cadoul a fost rezervat cu succes! Veți primi un email de confirmare.");
      
      // Update gift quantity
      setGifts(prev => prev.map(gift => 
        gift.id === selectedGift?.id 
          ? { ...gift, quantity: gift.quantity - 1 }
          : gift
      ).filter(gift => gift.quantity > 0));
      
      // Reset form
      setFormData({ name: "", email: "" });
      setShowForm(false);
      setSelectedGift(null);
    } catch (error) {
      toast.error("A apărut o eroare. Vă rugăm să încercați din nou.");
    }
  };

  return (
    <section id="gifts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-rose mb-4">
            Idei de Cadouri
          </h2>
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-12 h-px bg-wedding-gold"></div>
            <Heart className="text-wedding-rose fill-current w-5 h-5" />
            <div className="w-12 h-px bg-wedding-gold"></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-gray-600 space-y-4">
            <p>Fără plic, fără presiune 😄</p>
            <p>Ne bucurăm enorm că veți fi alături de noi — și asta e tot ce contează!</p>
            <p>
              Nu avem nevoie de plic sau daruri, dar dacă vreți totuși să ne surprindeți cu ceva, 
              am pregătit o listă cu lucruri care ne-ar prinde bine în noua noastră viață de "soț + soție".
            </p>
            <p>
              Unele cadouri sunt mai costisitoare, dar pentru asta există prieteni – 
              merge perfect și cu "cadou la comun"!
            </p>
            <p>Luați-o ca pe o inspirație, nu ca pe o listă de cumpărături! 😉</p>
          </div>
        </div>

        {!showGifts ? (
          <div className="text-center">
            <Button 
              onClick={handleShowGifts}
              className="bg-wedding-rose hover:bg-wedding-rose-dark text-white px-8 py-3 text-lg"
            >
              <Gift className="w-5 h-5 mr-2" />
              Vezi ideile de cadouri
            </Button>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wedding-rose"></div>
                <p className="mt-4 text-gray-600">Se încarcă cadourile...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {gifts.map((gift) => (
                    <Card key={gift.id} className="wedding-card overflow-hidden group hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        <img 
                          src={gift.image} 
                          alt={gift.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {gift.quantity > 1 && (
                          <div className="absolute top-2 right-2 bg-wedding-gold text-white text-xs px-2 py-1 rounded-full">
                            {gift.quantity} disponibile
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-playfair text-lg text-wedding-rose mb-2">{gift.name}</h3>
                        
                        {gift.link && (
                          <a 
                            href={gift.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-3 transition-colors"
                          >
                            Vezi detalii
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        
                        <Button 
                          onClick={() => selectGift(gift)}
                          className="w-full bg-wedding-rose hover:bg-wedding-rose-dark text-white"
                        >
                          Rezervă Acest Cadou
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {gifts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Nu sunt cadouri disponibile momentan.</p>
                  </div>
                )}
              </>
            )}

            {showForm && selectedGift && (
              <Card className="wedding-card max-w-md mx-auto p-6">
                <h3 className="font-playfair text-2xl text-wedding-rose mb-4 text-center">
                  Rezervă Cadoul
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  <strong>{selectedGift.name}</strong>
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gift-name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Numele Dvs
                    </Label>
                    <Input
                      id="gift-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="border-wedding-rose/30 focus:border-wedding-rose"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gift-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Adresa de Email
                    </Label>
                    <Input
                      id="gift-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="border-wedding-rose/30 focus:border-wedding-rose"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setSelectedGift(null);
                        setFormData({ name: "", email: "" });
                      }}
                      className="flex-1"
                    >
                      Anulează
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-wedding-rose hover:bg-wedding-rose-dark text-white"
                    >
                      Confirmă Rezervarea
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GiftsSection;
