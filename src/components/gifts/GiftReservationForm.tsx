
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GiftReservationFormProps {
  selectedGift: {
    name: string;
    row: number;
  };
  onSubmit: (formData: { nume: string; email: string }) => void;
  submitStatus: string;
}

const GiftReservationForm = ({ selectedGift, onSubmit, submitStatus }: GiftReservationFormProps) => {
  const [formData, setFormData] = useState({ nume: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nume: "", email: "" });
  };

  return (
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
  );
};

export default GiftReservationForm;
