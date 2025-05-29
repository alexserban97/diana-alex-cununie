import { useState } from "react";
import { Gift, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GiftsSection = () => {
  const [showGifts, setShowGifts] = useState(false);
  const [gifts, setGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [formData, setFormData] = useState({ nume: "", email: "" });
  const [submitStatus, setSubmitStatus] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzboWwo65m88MbnkL84gzzVgsNOy4A3Aep0jj27rvV3buwObMR45ofoSzIOh0KULBKtZQ/exec?t=' + Date.now());
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status} status`);
      }

      const result = await response.json();
      
      if (!result?.data || !Array.isArray(result.data)) {
        throw new Error('Invalid data format received');
      }

      // Filtrează doar produsele cu stoc > 0
      const availableProducts = result.data.filter(product => product.quantity > 0);
      setGifts(availableProducts);
    } catch (error) {
      console.error("Eroare la încărcarea produselor:", error);
      // Fallback cu date mock pentru demonstrație
      setGifts([
        { name: "Set de vase", image: "https://via.placeholder.com/150", link: "#", row: 1, quantity: 1 },
        { name: "Aspirator robot", image: "https://via.placeholder.com/150", link: "#", row: 2, quantity: 1 },
        { name: "Cafetieră", image: "https://via.placeholder.com/150", link: "#", row: 3, quantity: 1 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowGifts = () => {
    setShowGifts(true);
    loadProducts();
  };

  const selectGift = (gift: any) => {
    setSelectedGift(gift);
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('gift-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("Se trimite cererea...");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nume', formData.nume);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('cadou', selectedGift.name);

      const response = await fetch("https://script.google.com/macros/s/AKfycbwcB8Rcr5NKur3dGOCbakFyUcU9Wj0mVhKC4AxQ2y6EiswsR6meprqfYVGgz7_4Yptv/exec", {
        method: "POST",
        body: formDataToSend
      });

      if (response.ok) {
        // Actualizează stocul în Google Sheets
        await fetch(`https://script.google.com/macros/s/AKfycbzboWwo65m88MbnkL84gzzVgsNOy4A3Aep0jj27rvV3buwObMR45ofoSzIOh0KULBKtZQ/exec?action=updateStock&row=${selectedGift.row}`);
        
        // Actualizează stocul local și elimină produsul dacă stocul ajunge la 0
        setGifts(prevGifts => {
          return prevGifts.map(gift => {
            if (gift.row === selectedGift.row) {
              const newQuantity = gift.quantity - 1;
              return { ...gift, quantity: newQuantity };
            }
            return gift;
          }).filter(gift => gift.quantity > 0); // Elimină produsele cu stoc 0
        });
        
        setSubmitStatus("Cadoul a fost rezervat cu succes! Veți primi un email de confirmare.");
        setFormData({ nume: "", email: "" });
        setTimeout(() => {
          setShowForm(false);
          setSelectedGift(null);
        }, 3000);
      } else {
        throw new Error('Eroare la server');
      }
    } catch (error) {
      console.error("Eroare la trimitere:", error);
      setSubmitStatus("A apărut o eroare. Vă rugăm să încercați din nou mai târziu.");
    }
  };

  return (
    <section id="gifts" className="py-20 bg-wedding-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Gift className="text-wedding-rose w-8 h-8" />
            <h2 className="font-playfair text-4xl md:text-5xl text-wedding-rose">
              Idei de Cadouri
            </h2>
            <Gift className="text-wedding-rose w-8 h-8" />
          </div>
          
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-2">
            <p>Fără plic, fără presiune 😄</p>
            <p>Ne bucurăm enorm că veți fi alături de noi — și asta e tot ce contează!</p>
            <p>Nu avem nevoie de plic sau daruri, dar dacă vreți totuși să ne surprindeți cu ceva, am pregătit o listă cu lucruri care ne-ar prinde bine în noua noastră viață de "soț + soție".</p>
            <p>Unele cadouri sunt mai costisitoare, dar pentru asta există prieteni – merge perfect și cu "cadou la comun"!</p>
            <p className="font-great-vibes text-wedding-gold text-xl">
              Luați-o ca pe o inspirație, nu ca pe o listă de cumpărături! 😉
            </p>
          </div>
        </div>

        {!showGifts ? (
          <div className="text-center">
            <Button
              onClick={handleShowGifts}
              className="bg-wedding-rose hover:bg-wedding-rose/90 text-white px-8 py-3 text-lg"
            >
              Vezi ideile de cadouri
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wedding-rose"></div>
                <p className="mt-2">Se încarcă cadourile...</p>
              </div>
            ) : gifts.length === 0 ? (
              <div className="text-center">
                <p className="text-lg text-gray-600">Nu sunt cadouri disponibile momentan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gifts.map((gift, index) => (
                  <Card key={index} className="wedding-card p-6 text-center hover:scale-105 transition-transform duration-300">
                    <img 
                      src={gift.image || 'https://via.placeholder.com/150'} 
                      alt={gift.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                    <h3 className="font-playfair text-xl text-wedding-rose mb-3">
                      {gift.name}
                    </h3>
                    {gift.quantity && (
                      <p className="text-sm text-gray-500 mb-2">
                        Disponibile: {gift.quantity}
                      </p>
                    )}
                    {gift.link && (
                      <a 
                        href={gift.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-wedding-gold hover:underline block mb-3"
                      >
                        Vezi detalii
                      </a>
                    )}
                    <Button
                      onClick={() => selectGift(gift)}
                      className="bg-wedding-gold hover:bg-wedding-gold/90 text-white w-full"
                    >
                      Rezervă Acest Cadou
                    </Button>
                  </Card>
                ))}
              </div>
            )}

            {showForm && selectedGift && (
              <Card id="gift-form" className="wedding-card max-w-md mx-auto p-8">
                <div className="text-center mb-6">
                  <Heart className="text-wedding-rose fill-current w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-playfair text-2xl text-wedding-rose mb-2">
                    Rezervă Cadoul
                  </h3>
                  <p className="text-gray-600">
                    <strong>{selectedGift.name}</strong>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nume" className="text-gray-700">
                      Numele Dvs:
                    </Label>
                    <Input
                      id="nume"
                      type="text"
                      value={formData.nume}
                      onChange={(e) => setFormData(prev => ({ ...prev, nume: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Adresa de Email:
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-wedding-rose hover:bg-wedding-rose/90 text-white py-3"
                  >
                    Confirmă Rezervarea
                  </Button>

                  {submitStatus && (
                    <p className={`text-center text-sm ${
                      submitStatus.includes('succes') ? 'text-green-600' : 
                      submitStatus.includes('eroare') ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {submitStatus}
                    </p>
                  )}
                </form>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftsSection;
