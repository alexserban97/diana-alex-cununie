
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

  const cocktails = [
    "Mojito", "Pina Colada", "Margarita", "Cosmopolitan", 
    "Mai Tai", "Bloody Mary", "Daiquiri", "Whiskey Sour", 
    "Negroni", "Aperol Spritz"
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
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    } catch (error) {
      toast.error("A apărut o eroare. Vă rugăm să încercați din nou.");
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
                  <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}>
                    <SelectTrigger className="border-wedding-rose/30 focus:border-wedding-rose">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Unul</SelectItem>
                      <SelectItem value="2">Doi</SelectItem>
                      <SelectItem value="3">Trei</SelectItem>
                      <SelectItem value="4">Patru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="events">Voi participa la</Label>
                  <Select value={formData.events} onValueChange={(value) => setFormData(prev => ({ ...prev, events: value }))}>
                    <SelectTrigger className="border-wedding-rose/30 focus:border-wedding-rose">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-event">Toate evenimentele</SelectItem>
                      <SelectItem value="wedding-ceremony">Ceremonia de cununie</SelectItem>
                      <SelectItem value="reception-party">Petrecerea de recepție</SelectItem>
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
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="border-wedding-rose/30 focus:border-wedding-rose"
                  placeholder="Mesaj special pentru miri..."
                />
              </div>

              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-wedding-rose hover:bg-wedding-rose-dark text-white px-8 py-3 text-lg"
                >
                  Trimite RSVP
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
