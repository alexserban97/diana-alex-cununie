
import GiftCard from "./GiftCard";

interface Gift {
  name: string;
  image?: string;
  quantity?: number;
  link?: string;
  row: number;
}

interface GiftListProps {
  gifts: Gift[];
  loading: boolean;
  onSelectGift: (gift: Gift) => void;
}

const GiftList = ({ gifts, loading, onSelectGift }: GiftListProps) => {
  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wedding-rose"></div>
        <p className="mt-2">Se încarcă cadourile...</p>
      </div>
    );
  }

  if (gifts.length === 0) {
    return (
      <div className="text-center">
        <p className="text-lg text-gray-600">Nu sunt cadouri disponibile momentan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {gifts.map((gift, index) => (
        <GiftCard
          key={index}
          gift={gift}
          onReserve={() => onSelectGift(gift)}
        />
      ))}
    </div>
  );
};

export default GiftList;
