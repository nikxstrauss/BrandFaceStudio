"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Check, Loader2, AlertCircle, ArrowRight, ArrowLeft, Megaphone, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

export default function ErstgespraechPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    goals: [] as string[],
    budget: "",
    timeframe: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = 5;

  const goals = [
    { id: "brand-awareness", title: "Brand Awareness", description: "Bekanntheit steigern", icon: Megaphone },
    { id: "increase-sales", title: "Verkäufe steigern", description: "Mehr Umsatz generieren", icon: TrendingUp },
    { id: "recruit-talent", title: "Mitarbeiter:innen gewinnen", description: "Employer Branding", icon: Users },
  ];

  const budgetOptions = [
    { id: "2.5k-7.5k", label: "2.500€ - 7.500€" },
    { id: "7.5k-15k", label: "7.500€ - 15.000€" },
    { id: "15k-25k", label: "15.000€ - 25.000€" },
    { id: "25k+", label: "25.000€+" },
  ];

  const timeframeOptions = [
    { id: "asap", label: "So schnell wie möglich" },
    { id: "1-3-months", label: "1-3 Monate" },
    { id: "3-6-months", label: "3-6 Monate" },
    { id: "6+-months", label: "6+ Monate" },
  ];

  const toggleGoal = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0 && formData.goals.length === 0) {
      newErrors.goals = "Bitte wähle mindestens ein Ziel aus";
    }
    if (step === 1 && !formData.budget) {
      newErrors.budget = "Bitte wähle ein Budget aus";
    }
    if (step === 2 && !formData.timeframe) {
      newErrors.timeframe = "Bitte wähle einen Zeitrahmen aus";
    }
    if (step === 3) {
      if (!formData.firstName.trim()) newErrors.firstName = "Vorname ist erforderlich";
      if (!formData.lastName.trim()) newErrors.lastName = "Nachname ist erforderlich";
      if (!formData.email.trim()) {
        newErrors.email = "E-Mail ist erforderlich";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Ungültige E-Mail Adresse";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/erstgespraech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Fehler beim Senden');

      setSubmitSuccess(true);
    } catch (error) {
      setErrors({ submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
        {submitSuccess ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 glow-green">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vielen Dank für deine Anfrage!</h1>
            <p className="text-lg text-foreground/70 mb-8">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 hover:glow-purple">
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Auf Social Media <span className="purple-gradient serif italic block md:inline">durchstarten?</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
                Dann trag' dich jetzt für dein kostenloses Erstgespräch ein!
              </p>
            </div>

            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-20 glow-purple'
                        : 'bg-foreground/10 w-12'
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-foreground/50 font-medium">
                Schritt {currentStep + 1} von {totalSteps}
              </p>
            </div>

            <div className="glass-effect border border-primary/20 rounded-2xl p-8 md:p-12 min-h-[550px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
              
              {currentStep === 0 && (
                <div className="step-fade-in relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                    Was sind eure Ziele? <span className="text-pink-500">*</span>
                  </h2>
                  {errors.goals && (
                    <div className="flex items-center gap-2 text-pink-500 mb-8 justify-center bg-pink-500/10 border border-pink-500/30 rounded-lg px-4 py-3">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">{errors.goals}</p>
                    </div>
                  )}
                  <div className="grid md:grid-cols-3 gap-6">
                    {goals.map((goal) => {
                      const IconComponent = goal.icon;
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => toggleGoal(goal.id)}
                          className={`group p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                            formData.goals.includes(goal.id)
                              ? 'border-primary bg-gradient-to-br from-purple-500/20 to-pink-500/20 glow-purple shadow-2xl'
                              : 'border-primary/20 hover:border-primary/50 glass-effect hover:bg-white/5'
                          }`}
                        >
                          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                            formData.goals.includes(goal.id)
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500 glow-purple-strong'
                              : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30'
                          }`}>
                            <IconComponent className={`w-10 h-10 ${
                              formData.goals.includes(goal.id) ? 'text-white' : 'text-purple-300'
                            }`} />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                          <p className="text-sm text-foreground/60">{goal.description}</p>
                          {formData.goals.includes(goal.id) && (
                            <div className="absolute top-3 right-3">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="step-fade-in relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                    Wie hoch ist euer <span className="purple-gradient serif italic">Budget?</span> <span className="text-pink-500">*</span>
                  </h2>
                  {errors.budget && (
                    <div className="flex items-center gap-2 text-pink-500 mb-8 justify-center bg-pink-500/10 border border-pink-500/30 rounded-lg px-4 py-3">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">{errors.budget}</p>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {budgetOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option.id })}
                        className={`p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 relative ${
                          formData.budget === option.id
                            ? 'border-primary bg-gradient-to-br from-purple-500/20 to-pink-500/20 glow-purple shadow-2xl'
                            : 'border-primary/20 hover:border-primary/50 glass-effect hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                          formData.budget === option.id
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 glow-purple-strong'
                            : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                        }`}>
                          <DollarSign className={`w-8 h-8 ${
                            formData.budget === option.id ? 'text-white' : 'text-purple-300'
                          }`} />
                        </div>
                        <h3 className="text-xl font-bold">{option.label}</h3>
                        {formData.budget === option.id && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-fade-in relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                    Wann soll es <span className="purple-gradient serif italic">losgehen?</span> <span className="text-pink-500">*</span>
                  </h2>
                  {errors.timeframe && (
                    <div className="flex items-center gap-2 text-pink-500 mb-8 justify-center bg-pink-500/10 border border-pink-500/30 rounded-lg px-4 py-3">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">{errors.timeframe}</p>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {timeframeOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeframe: option.id })}
                        className={`p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 relative ${
                          formData.timeframe === option.id
                            ? 'border-primary bg-gradient-to-br from-purple-500/20 to-pink-500/20 glow-purple shadow-2xl'
                            : 'border-primary/20 hover:border-primary/50 glass-effect hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                          formData.timeframe === option.id
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 glow-purple-strong'
                            : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                        }`}>
                          <Calendar className={`w-8 h-8 ${
                            formData.timeframe === option.id ? 'text-white' : 'text-purple-300'
                          }`} />
                        </div>
                        <h3 className="text-xl font-bold">{option.label}</h3>
                        {formData.timeframe === option.id && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step-fade-in space-y-6 relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                    Deine <span className="purple-gradient serif italic">Kontaktdaten</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Vorname <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full px-5 py-4 rounded-xl glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:glow-purple transition-all ${
                          errors.firstName ? 'border-pink-500 focus:border-pink-500' : 'border-primary/30 focus:border-primary'
                        }`}
                        placeholder="Max"
                      />
                      {errors.firstName && <p className="text-sm text-pink-500 mt-2 font-medium">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Nachname <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`w-full px-5 py-4 rounded-xl glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:glow-purple transition-all ${
                          errors.lastName ? 'border-pink-500 focus:border-pink-500' : 'border-primary/30 focus:border-primary'
                        }`}
                        placeholder="Mustermann"
                      />
                      {errors.lastName && <p className="text-sm text-pink-500 mt-2 font-medium">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      E-Mail <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-5 py-4 rounded-xl glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:glow-purple transition-all ${
                        errors.email ? 'border-pink-500 focus:border-pink-500' : 'border-primary/30 focus:border-primary'
                      }`}
                      placeholder="max@beispiel.de"
                    />
                    {errors.email && <p className="text-sm text-pink-500 mt-2 font-medium">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Telefon (optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl glass-effect border border-primary/30 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:glow-purple transition-all"
                      placeholder="+49 123 456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Unternehmen (optional)</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl glass-effect border border-primary/30 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:glow-purple transition-all"
                      placeholder="Dein Unternehmen"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="step-fade-in space-y-6 relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                    Erzähl uns mehr über dein <span className="purple-gradient serif italic">Projekt</span>
                  </h2>
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Deine Nachricht (optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={10}
                      className="w-full px-5 py-4 rounded-xl glass-effect border border-primary/30 bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:glow-purple transition-all resize-none"
                      placeholder="Beschreibe dein Projekt, deine Ziele oder weitere Details..."
                    />
                  </div>
                  {errors.submit && (
                    <div className="flex items-center gap-2 text-pink-500 bg-pink-500/10 border border-pink-500/30 rounded-lg px-4 py-3">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">{errors.submit}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-10">
              <Button
                onClick={handleBack}
                disabled={currentStep === 0}
                variant="outline"
                size="lg"
                className={`border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Zurück
              </Button>

              {currentStep < totalSteps - 1 ? (
                <Button 
                  onClick={handleNext} 
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:glow-purple-strong hover:scale-105 transition-all shadow-lg px-8"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:glow-purple-strong hover:scale-105 transition-all shadow-lg px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Absenden
                      <Check className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </section>

      <footer className="border-t border-border/20 relative accent-line mt-20">
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
