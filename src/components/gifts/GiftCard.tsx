
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GiftCardProps {
  gift: {
    name: string;
    image?: string;
    quantity?: number;
    link?: string;
  };
  onReserve: () => void;
}

const GiftCard = ({ gift, onReserve }: GiftCardProps) => {
  return (
    <Card className="wedding-card p-6 text-center hover:scale-105 transition-transform duration-300">
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
        onClick={onReserve}
        className="bg-wedding-gold hover:bg-wedding-gold/90 text-white w-full"
      >
        Rezervă Acest Cadou
      </Button>
    </Card>
  );
};

export default GiftCard;
