import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Mail, User } from "lucide-react";
import { toast } from "sonner";

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    events: "all-event",
    cocktails: [] as string[],
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const cocktails = [
    "Aperol Spritz", 
    "Limoncello Spritz", 
    "Hugo Spritz", 
    "Cuba Libre", 
    "Rum Punch",
    "Mojito", 
    "Margarita", 
    "Whiskey", 
    "Vodka", 
    "Jägermeister",
    "Bere", 
    "Vin Rose", 
    "Vin Alb"
  ];

  const handleCocktailChange = (cocktail: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      cocktails: checked 
        ? [...prev.cocktails, cocktail]
        : prev.cocktails.filter(c => c !== cocktail)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/manelgvd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          guests: formData.guests,
          events: formData.events,
          cocktails: formData.cocktails,
          message: formData.message
        }),
      });

      if (response.ok) {
        toast.success("RSVP-ul a fost trimis cu succes! Vă mulțumim pentru confirmare.");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          guests: "1",
          events: "all-event",
          cocktails: [],
          message: ""
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error("A apărut o eroare. Vă rugăm să încercați din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 wedding-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-wedding-rose mb-4">
            Confirmă Prezența
          </h2>
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-12 h-px bg-wedding-gold"></div>
            <Heart className="text-wedding-rose fill-current w-5 h-5" />
            <div className="w-12 h-px bg-wedding-gold"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vă rugăm să confirmați prezența până pe 1 August 2025. 
            Abia așteptăm să sărbătorim împreună!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="wedding-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Numele Dvs *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="border-wedding-rose/30 focus:border-wedding-rose"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="_replyto"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="border-wedding-rose/30 focus:border-wedding-rose"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Numărul de invitați
                  </Label>
                  <Select 
                    value={formData.guests} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}
                    name="guest"
                  >
                    <SelectTrigger className="border-wedding-rose/30 focus:ring-wedding-rose">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Unul</SelectItem>
                      <SelectItem value="2">Doi</SelectItem>
                      <SelectItem value="3">Trei</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="events">Voi participa la</Label>
                  <Select 
                    value={formData.events} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, events: value }))}
                    name="events"
                  >
                    <SelectTrigger className="border-wedding-rose/30 focus:ring-wedding-rose">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-event">Toate evenimentele</SelectItem>
                      <SelectItem value="wedding-ceremony">Ceremonia de cununie</SelectItem>
                      <SelectItem value="reception-party">Petrecerea de cununie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Ce cocktailuri preferați? (Selectați multiple)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {cocktails.map((cocktail) => (
                    <label key={cocktail} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="cocktails[]"
                        value={cocktail}
                        checked={formData.cocktails.includes(cocktail)}
                        onChange={(e) => handleCocktailChange(cocktail, e.target.checked)}
                        className="rounded border-wedding-rose/30 text-wedding-rose focus:ring-wedding-rose"
                      />
                      <span className="text-sm">{cocktail}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mesajul Dvs</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="border-wedding-rose/30 focus:border-wedding-rose placeholder-wedding-rose"
                  placeholder="Mesaj special pentru miri..."
                />
              </div>

              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-wedding-rose hover:bg-wedding-rose-dark text-white px-8 py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Se trimite..." : "Trimite RSVP"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
