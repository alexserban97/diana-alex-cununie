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
    console.log("Starting to load products...");
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwXV0x-KIROe702MNuxBT_iu_0n17Gacboju-qljTMOJNXt78Xlg00A3EUofa61kVIvjQ/exec?t=' + Date.now());
      
      console.log("Response status:", response.status, response.ok);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status} status`);
      }

      const result = await response.json();
      console.log("Raw API response:", result);
      
      if (!result?.data || !Array.isArray(result.data)) {
        console.error("Invalid data format. Expected result.data to be an array, got:", typeof result?.data);
        throw new Error('Invalid data format received');
      }

      console.log("Processing", result.data.length, "products");
      
      // Mapăm datele pentru a avea numele corect de proprietăți
      const mappedProducts = result.data.map((product: any, index: number) => {
        console.log(`Product ${index}:`, product);
        
        const mappedProduct = {
          name: product["nume produs"] || product.name || "Produs fără nume",
          image: product["link imagine produs"] || product.image,
          quantity: product["cantitate disponibilă"] || product.quantity || 0,
          link: product["link produs"] || product.link,
          row: product.row || index + 2
        };
        
        console.log(`Mapped product ${index}:`, mappedProduct);
        return mappedProduct;
      });

      const availableProducts = mappedProducts.filter((product: GiftItem) => {
        const isAvailable = product.quantity > 0;
        console.log(`Product "${product.name}" available:`, isAvailable, `(quantity: ${product.quantity})`);
        return isAvailable;
      });
      
      console.log("Available products:", availableProducts);
      setGifts(availableProducts);
    } catch (error) {
      console.error("Eroare la încărcarea produselor:", error);
      // Fallback data for testing
      const fallbackData = [
        { name: "Set de vase", image: "https://via.placeholder.com/150", link: "#", row: 1, quantity: 1 },
        { name: "Aspirator robot", image: "https://via.placeholder.com/150", link: "#", row: 2, quantity: 1 },
        { name: "Cafetieră", image: "https://via.placeholder.com/150", link: "#", row: 3, quantity: 1 },
      ];
      console.log("Using fallback data:", fallbackData);
      setGifts(fallbackData);
    } finally {
      setLoading(false);
      console.log("Loading finished");
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
      formDataToSend.append('link', selectedGift.link || '');

      const response = await fetch("https://script.google.com/macros/s/AKfycbwHRmrWml-niVxAuDcVK_QWYfUk7PRShd_XqbwB-RolrOd7Qy_urv17VBNx3EsAc2k9/exec", {
        method: "POST",
        body: formDataToSend
      });

      if (response.ok) {
        await fetch(`https://script.google.com/macros/s/AKfycbwXV0x-KIROe702MNuxBT_iu_0n17Gacboju-qljTMOJNXt78Xlg00A3EUofa61kVIvjQ/exec?action=updateStock&row=${selectedGift.row}`);
        
        setGifts(prevGifts => {
          return prevGifts.map(gift => {
            if (gift.row === selectedGift.row) {
              const newQuantity = gift.quantity! - 1;
              return { ...gift, quantity: newQuantity };
            }
            return gift;
          }).filter(gift => gift.quantity! > 0);
        });
        
        setSubmitStatus("Excelentă alegere! 💝 Ai primit un email de confirmare cu toate detaliile!");
        setTimeout(() => {
          setShowForm(false);
          setSelectedGift(null);
        }, 4000);
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
          
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-2 font-playfair">
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
