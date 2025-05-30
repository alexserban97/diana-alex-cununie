
import { useState } from "react";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import GiftList from "./gifts/GiftList";
import GiftReservationForm from "./gifts/GiftReservationForm";

interface GiftItem {
  name: string;
  image?: string;
  quantity?: number;
  link?: string;
  row: number;
}

const GiftsSection = () => {
  const [showGifts, setShowGifts] = useState(false);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [submitStatus, setSubmitStatus] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyj7aIVXTZ22RQCb8qrsbsLUTkVNKulLyqKkRulIMN5yRdGjXKWWJ86Mrlwp1N-PSOiQg/exec?t=' + Date.now());
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status} status`);
      }

      const result = await response.json();
      
      if (!result?.data || !Array.isArray(result.data)) {
        throw new Error('Invalid data format received');
      }

      const availableProducts = result.data.filter((product: GiftItem) => product.quantity > 0);
      setGifts(availableProducts);
    } catch (error) {
      console.error("Eroare la încărcarea produselor:", error);
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

  const selectGift = (gift: GiftItem) => {
    setSelectedGift(gift);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('gift-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = async (formData: { nume: string; email: string }) => {
    if (!selectedGift) return;
    
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
        await fetch(`https://script.google.com/macros/s/AKfycbyj7aIVXTZ22RQCb8qrsbsLUTkVNKulLyqKkRulIMN5yRdGjXKWWJ86Mrlwp1N-PSOiQg/exec?action=updateStock&row=${selectedGift.row}`);
        
        setGifts(prevGifts => {
          return prevGifts.map(gift => {
            if (gift.row === selectedGift.row) {
              const newQuantity = gift.quantity! - 1;
              return { ...gift, quantity: newQuantity };
            }
            return gift;
          }).filter(gift => gift.quantity! > 0);
        });
        
        setSubmitStatus("Cadoul a fost rezervat cu succes! Veți primi un email de confirmare.");
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
            <GiftList 
              gifts={gifts}
              loading={loading}
              onSelectGift={selectGift}
            />

            {showForm && selectedGift && (
              <GiftReservationForm
                selectedGift={selectedGift}
                onSubmit={handleFormSubmit}
                submitStatus={submitStatus}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftsSection;
