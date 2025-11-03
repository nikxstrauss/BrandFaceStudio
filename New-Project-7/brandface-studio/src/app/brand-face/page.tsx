"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Check, Loader2, AlertCircle, Star, Users, TrendingUp, Heart, Award, Zap } from "lucide-react";

export default function BrandFacePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    instagram: "",
    tiktok: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Vorname ist erforderlich";
    if (!formData.lastName.trim()) newErrors.lastName = "Nachname ist erforderlich";
    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail Adresse";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/brand-face-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Fehler beim Senden");

      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        instagram: "",
        tiktok: "",
        message: "",
      });
    } catch (error) {
      setErrors({ submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="purple-gradient">brandface</span>
            <span className="text-foreground">.studio</span>
          </Link>
          <Link href="/" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            Zurück zur Startseite
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Werde ein <span className="purple-gradient serif italic">Brand Face</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
            Verdiene Geld mit deiner Reichweite und arbeite mit Premium-Marken zusammen
          </p>
        </div>
      </section>

      {/* Was ist ein Brand Face Section */}
      <section className="border-y border-border/20 glass-effect relative accent-line accent-line-bottom">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Was ist ein <span className="purple-gradient serif italic">Brand Face?</span>
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                Ein Brand Face ist mehr als nur ein Influencer – du wirst zum Gesicht einer Marke. 
                Du repräsentierst authentisch die Werte und Produkte unserer Partner-Brands und 
                baust eine langfristige Beziehung zu deiner Community auf.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Als Brand Face arbeitest du exklusiv mit ausgewählten Premium-Marken und erhältst 
                faire Vergütung, professionelle Unterstützung und exklusive Kampagnen-Möglichkeiten.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-effect border border-primary/20 rounded-xl p-6 hover:glow-purple transition-all">
                <Star className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Exklusiv</h3>
                <p className="text-sm text-foreground/70">Premium Marken-Partnerschaften</p>
              </div>
              <div className="glass-effect border border-primary/20 rounded-xl p-6 hover:glow-purple transition-all">
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Wachstum</h3>
                <p className="text-sm text-foreground/70">Professionelle Unterstützung</p>
              </div>
              <div className="glass-effect border border-primary/20 rounded-xl p-6 hover:glow-purple transition-all">
                <Heart className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Authentisch</h3>
                <p className="text-sm text-foreground/70">Echte Brand-Verbindung</p>
              </div>
              <div className="glass-effect border border-primary/20 rounded-xl p-6 hover:glow-purple transition-all">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Fair</h3>
                <p className="text-sm text-foreground/70">Transparente Vergütung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Deine <span className="purple-gradient serif italic">Vorteile</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium Netzwerk</h3>
            <p className="text-foreground/70">
              Zugang zu exklusiven Marken und Kampagnen, die perfekt zu dir passen
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Professionelle Betreuung</h3>
            <p className="text-foreground/70">
              Persönlicher Support und strategische Beratung für maximalen Erfolg
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Faire Konditionen</h3>
            <p className="text-foreground/70">
              Transparente Vergütung und langfristige Partnerschaften auf Augenhöhe
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="border-y border-border/20 glass-effect relative accent-line accent-line-bottom">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bewirb dich <span className="purple-gradient serif italic">jetzt!</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Fülle das Formular aus und werde Teil unserer Brand Face Community
            </p>
          </div>

          {submitSuccess ? (
            <div className="text-center py-12 glass-effect border border-primary/20 rounded-xl">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bewerbung erhalten!</h3>
              <p className="text-foreground/70 mb-6">
                Vielen Dank für dein Interesse. Wir melden uns innerhalb von 48 Stunden bei dir.
              </p>
              <Button onClick={() => setSubmitSuccess(false)} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                Weitere Bewerbung senden
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 glass-effect border border-primary/20 rounded-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Vorname <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all ${
                      errors.firstName ? "border-red-500" : "border-primary/20"
                    }`}
                    placeholder="Max"
                  />
                  {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nachname <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all ${
                      errors.lastName ? "border-red-500" : "border-primary/20"
                    }`}
                    placeholder="Mustermann"
                  />
                  {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  E-Mail <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all ${
                    errors.email ? "border-red-500" : "border-primary/20"
                  }`}
                  placeholder="max@beispiel.de"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Telefon (optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-effect border border-primary/20 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all"
                  placeholder="+49 123 456789"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Instagram Handle</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-primary/20 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all"
                    placeholder="@deinhandle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">TikTok Handle</label>
                  <input
                    type="text"
                    value={formData.tiktok}
                    onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-primary/20 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all"
                    placeholder="@deinhandle"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Erzähl uns von dir (optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg glass-effect border border-primary/20 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all resize-none"
                  placeholder="Warum möchtest du ein Brand Face werden?"
                />
              </div>

              {errors.submit && (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">{errors.submit}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:glow-purple-strong hover:scale-105 transition-all font-bold py-6 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  "Bewerbung absenden"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 relative accent-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-foreground/50">
              © 2025 brandface.studio – Dein Brand Face für authentische Kampagnen.
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <Link href="/impressum" className="text-sm text-foreground/50 hover:text-primary hover:glow-purple transition-all duration-300">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-foreground/50 hover:text-primary hover:glow-purple transition-all duration-300">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
