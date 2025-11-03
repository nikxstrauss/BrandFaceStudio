"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Loader2, Check, AlertCircle } from "lucide-react";

const projects = [
  {
    title: "CocaCola x Oreo",
    thumbnail: "https://i.ytimg.com/vi/NkRSdBPrcDw/maxresdefault.jpg",
    video: "https://www.youtube.com/embed/NkRSdBPrcDw?autoplay=1&mute=1&loop=1&playlist=NkRSdBPrcDw&controls=0&modestbranding=1&playsinline=1",
    hasVideo: true, // YouTube Shorts video embedded
    isIframe: true,
    description: "Influencer-Kampagne mit über 320.000 organischen Views auf TikTok und 1M+ Views auf Instagram",
    stats: {
      followers: "+548.3k",
      likes: "+41.6k",
      views: "+1.4M"
    },
    storyTitle: "Wie wir einen Hype-Drink in einen",
    storyHighlight: "Insta-Magneten",
    storyTitleEnd: "verwandelten",
    storyContent: [
      "Die COKE x OREO Influencer-Kampagne zielte darauf ab, organisches Engagement zu maximieren und Hype für die Coca-Cola x Oreo Kollaboration zu schaffen.",
      "Mit einer Mischung aus Macro-, Mid- und Micro-Influencern erreichte die COKE x OREO Kampagne über 320.000 organische Views auf TikTok und über 1 Million Views auf Instagram innerhalb eines Monats."
    ]
  },
  {
    title: "Österreich Werbung",
    thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    video: "/videos/oesterreich.mp4",
    hasVideo: false,
    isIframe: false,
    description: "Tourismus-Kampagne zur Präsentation österreichischer Destinationen durch authentisches Storytelling",
    stats: {
      followers: "+325.7k",
      likes: "+28.3k",
      views: "+890k"
    },
    storyTitle: "Wie wir Österreich als",
    storyHighlight: "Traum-Destination",
    storyTitleEnd: "inszeniert haben",
    storyContent: [
      "Die Österreich Werbung Kampagne setzte auf authentisches Storytelling, um die Schönheit österreichischer Destinationen einem jungen, reisebegeisterten Publikum näherzubringen.",
      "Durch gezielte Influencer-Kooperationen und visuell beeindruckende Inhalte generierten wir über 890.000 Views und steigerten das Interesse an österreichischen Reisezielen signifikant."
    ]
  },
  {
    title: "Peek & Cloppenburg",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    video: "/videos/peek.mp4",
    hasVideo: false,
    isIframe: false,
    description: "Fashion-Recruiting-Kampagne gezielt für Gen-Z Talente im Einzelhandel",
    stats: {
      followers: "+412.5k",
      likes: "+35.2k",
      views: "+1.1M"
    },
    storyTitle: "Wie wir Gen-Z für",
    storyHighlight: "Fashion-Retail",
    storyTitleEnd: "begeistert haben",
    storyContent: [
      "Die Peek & Cloppenburg Recruiting-Kampagne zielte darauf ab, junge Talente für Karrieren im Modehandel zu gewinnen und das Unternehmen als attraktiven Arbeitgeber zu positionieren.",
      "Mit kreativen TikTok-Inhalten und authentischen Einblicken hinter die Kulissen erreichten wir über 1,1 Millionen Views und konnten die Arbeitgebermarke erfolgreich bei der Gen-Z etablieren."
    ]
  },
  {
    title: "willhaben",
    thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    video: "/videos/willhaben.mp4",
    hasVideo: false,
    isIframe: false,
    description: "Brand-Awareness-Kampagne für den digitalen Marktplatz auf allen Social-Media-Plattformen",
    stats: {
      followers: "+267.8k",
      likes: "+19.4k",
      views: "+675k"
    },
    storyTitle: "Wie wir willhaben zur",
    storyHighlight: "Social-Media-Sensation",
    storyTitleEnd: "gemacht haben",
    storyContent: [
      "Die willhaben Brand-Awareness-Kampagne setzte auf humorvolle und relatierbare Inhalte, um die Plattform bei einer jüngeren Zielgruppe bekannter zu machen.",
      "Durch strategische Influencer-Partnerschaften und virale Content-Formate generierten wir über 675.000 Views und steigerten die Markenbekanntheit signifikant auf Social Media."
    ]
  },
  {
    title: "TUI BLUE",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    video: "/videos/tui.mp4",
    hasVideo: false,
    isIframe: false,
    description: "Premium-Reisemarken-Content zur Präsentation luxuriöser Destinationen",
    stats: {
      followers: "+598.1k",
      likes: "+52.7k",
      views: "+1.8M"
    },
    storyTitle: "Wie wir Luxus-Reisen zu",
    storyHighlight: "Social-Media-Gold",
    storyTitleEnd: "verwandelt haben",
    storyContent: [
      "Die TUI BLUE Kampagne zielte darauf ab, Premium-Reiseerlebnisse durch visuell atemberaubende Inhalte und authentische Erlebnisberichte zu präsentieren.",
      "Mit einer Kombination aus Reise-Influencern und hochwertigem Content erreichten wir über 1,8 Millionen Views und positionierten TUI BLUE erfolgreich als Premium-Reisemarke für ein jüngeres Publikum."
    ]
  },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Typewriter animation state
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Brand Faces", "Kampagnen"];

  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
    submit?: string;
  }>({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitSuccess, setContactSubmitSuccess] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterIndex < currentWord.length) {
        setTypewriterText(currentWord.substring(0, typewriterIndex + 1));
        setTypewriterIndex(typewriterIndex + 1);
      } else if (isDeleting && typewriterIndex > 0) {
        setTypewriterText(currentWord.substring(0, typewriterIndex - 1));
        setTypewriterIndex(typewriterIndex - 1);
      } else if (!isDeleting && typewriterIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typewriterIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterIndex, isDeleting, wordIndex, words]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play center video
  useEffect(() => {
    const centerVideo = videoRefs.current[current];
    if (centerVideo) {
      // Reset video to start
      centerVideo.currentTime = 0;
      // Try to play
      const playPromise = centerVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error);
          // Autoplay might be blocked - video will show first frame
        });
      }
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== current) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [current]);

  const validateContactForm = () => {
    const errors: typeof contactErrors = {};

    if (!contactForm.firstName.trim()) {
      errors.firstName = "Vorname ist erforderlich";
    }
    if (!contactForm.lastName.trim()) {
      errors.lastName = "Nachname ist erforderlich";
    }
    if (!contactForm.email.trim()) {
      errors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = "Ungültige E-Mail Adresse";
    }
    if (!contactForm.message.trim()) {
      errors.message = "Nachricht ist erforderlich";
    }

    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    setContactSubmitting(true);
    setContactErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) throw new Error("Fehler beim Senden");

      setContactSubmitSuccess(true);
      setContactForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      setContactErrors({ submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." });
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="purple-gradient">brandface</span>
            <span className="text-foreground">.studio</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/#projects" className={`text-xs lg:text-sm font-normal text-foreground/80 hover:text-foreground transition-all duration-300 px-4 py-2.5 rounded-full hover:bg-white/20 backdrop-blur-md ${!isScrolled ? 'bg-white/10' : ''}`}>
              Projekte
            </Link>
            <Link href="/brand-face" className={`text-xs lg:text-sm font-normal text-foreground/80 hover:text-foreground transition-all duration-300 px-4 py-2.5 rounded-full hover:bg-white/20 backdrop-blur-md ${!isScrolled ? 'bg-white/10' : ''}`}>
              Werde ein Brand Face
            </Link>
            <Link href="/#contact" className={`text-xs lg:text-sm font-normal text-foreground/80 hover:text-foreground transition-all duration-300 px-4 py-2.5 rounded-full hover:bg-white/20 backdrop-blur-md ${!isScrolled ? 'bg-white/10' : ''}`}>
              Kontakt
            </Link>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 hover:glow-purple-strong hover:scale-105 pulse-on-hover font-semibold transition-all duration-300 ml-2 animated-gradient">
              <Link href="/erstgespraech">Zum kostenlosen Erstgespräch</Link>
            </Button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground/70 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/20 glass-effect backdrop-blur-sm">
            <div className="px-6 py-4 space-y-4">
              <Link href="/#projects" className="block text-sm font-normal text-foreground/90 hover:text-foreground transition-all duration-300 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" onClick={() => setMobileMenuOpen(false)}>
                Projekte
              </Link>
              <Link href="/brand-face" className="block text-sm font-normal text-foreground/90 hover:text-foreground transition-all duration-300 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" onClick={() => setMobileMenuOpen(false)}>
                Werde ein Brand Face
              </Link>
              <Link href="/#contact" className="block text-sm font-normal text-foreground/90 hover:text-foreground transition-all duration-300 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" onClick={() => setMobileMenuOpen(false)}>
                Kontakt
              </Link>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:glow-purple font-semibold transition-all duration-300">
                <Link href="/erstgespraech">Zum kostenlosen Erstgespräch</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Carousel */}
      <section id="projects" className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-7xl w-full text-center mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
            Empfohlene<br />
            <span className="purple-gradient serif italic typewriter">
              {typewriterText}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto font-light">
            Wir helfen Marken dabei, echte „Brand Faces" als visuelles Aushängeschild und Wiedererkennungsmerkmal zu etablieren.
          </p>
        </div>

        {/* Carousel - Updated with Version 67 styling */}
        <div className="w-full max-w-7xl relative flex items-center justify-center py-4">
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }} className="w-full max-w-5xl">
            <CarouselContent className="flex items-center py-6">
              {projects.map((project, index) => {
                const isActive = index === current;
                const isHovered = hoveredIndex === index;

                return (
                  <CarouselItem key={index} className="flex justify-center" style={{ flexBasis: isActive ? '45%' : '27.5%' }}>
                    <div
                      className="relative overflow-visible transition-all duration-700 ease-out carousel-item-wrapper"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        width: isActive ? '360px' : '260px',
                        transform: isActive
                          ? (isHovered ? 'scale(1.08)' : 'scale(1)')
                          : 'scale(0.88)',
                        opacity: isActive ? 1 : 0.45,
                        filter: isActive ? 'brightness(1)' : 'brightness(0.5)',
                        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: isActive && isHovered ? 20 : (isActive ? 10 : 1),
                      }}
                    >
                      <div
                        className="relative rounded-xl overflow-hidden"
                        style={{
                          border: isActive || isHovered
                            ? (isActive && isHovered ? '4px solid #a855f7' : '3px solid #a855f7')
                            : '3px solid rgba(168, 85, 247, 0.3)',
                          boxShadow: isActive && isHovered
                            ? '0 0 15px rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.2)'
                            : (isActive || isHovered
                              ? '0 0 10px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.15)'
                              : '0 0 8px rgba(168, 85, 247, 0.15)'),
                          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <div className="aspect-[9/16] relative bg-black">
                          {project.hasVideo ? (
                            project.isIframe ? (
                              <>
                                <iframe
                                  src={isActive ? project.video : ''}
                                  className="w-full h-full object-cover"
                                  frameBorder="0"
                                  allow="autoplay; fullscreen"
                                  allowFullScreen
                                  style={{ border: 'none' }}
                                />
                                {/* Fallback thumbnail for Same.new preview */}
                                <img
                                  src={project.thumbnail}
                                  alt={project.title}
                                  className="w-full h-full object-cover absolute inset-0 pointer-events-none"
                                  style={{ display: 'none' }}
                                  onError={(e) => {
                                    // Show thumbnail if iframe fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'block';
                                  }}
                                />
                              </>
                            ) : (
                              <video
                                ref={(el) => {
                                  videoRefs.current[index] = el;
                                }}
                                src={project.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            )
                          ) : (
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          )}

                          {/* Side videos (not active) - always show description */}
                          {!isActive && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6">
                              <h3 className="text-2xl font-bold mb-2 purple-gradient tracking-tight">{project.title}</h3>
                              <p className="text-sm text-foreground/90 line-clamp-2 leading-relaxed">
                                {project.description}
                              </p>
                            </div>
                          )}

                          {/* Center active video - show description only on hover */}
                          {isActive && (
                            <>
                              {/* Always show subtle gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                              {/* Show description on hover */}
                              {isHovered && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
                                  <h3 className="text-2xl font-bold mb-2 purple-gradient tracking-tight">{project.title}</h3>
                                  <p className="text-sm text-foreground/90 line-clamp-2 leading-relaxed">
                                    {project.description}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-16 bg-primary/20 hover:bg-primary/40 border-primary/30 hover:glow-purple" />
            <CarouselNext className="right-0 translate-x-16 bg-primary/20 hover:bg-primary/40 border-primary/30 hover:glow-purple" />
          </Carousel>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex gap-2 mt-6 lg:my-[35px]">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-primary glow-purple'
                  : 'w-2 bg-foreground/20 hover:bg-foreground/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Project Title and Description - Case Study Preview */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-2 pb-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight lg:my-[0px] lg:p-[5px]">
          {projects[current]?.title}
        </h2>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light">
          {projects[current]?.description}
        </p>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/20 glass-effect relative accent-line accent-line-bottom">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center stats-item">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 purple-gradient stats-number">
                {projects[current]?.stats.followers}
              </div>
              <div className="text-sm md:text-base text-foreground/50 uppercase tracking-wider stats-label">Follower</div>
            </div>
            <div className="text-center stats-item">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 purple-gradient stats-number">
                {projects[current]?.stats.likes}
              </div>
              <div className="text-sm md:text-base text-foreground/50 uppercase tracking-wider stats-label">Likes</div>
            </div>
            <div className="text-center stats-item">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 purple-gradient stats-number">
                {projects[current]?.stats.views}
              </div>
              <div className="text-sm md:text-base text-foreground/50 uppercase tracking-wider stats-label">Aufrufe</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 relative">
        <div className="max-w-3xl ml-0 lg:ml-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight">
            {projects[current]?.storyTitle}{" "}
            <span className="purple-gradient serif italic">
              {projects[current]?.storyHighlight}
            </span>{" "}
            {projects[current]?.storyTitleEnd}
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-6 font-light">
            {projects[current]?.storyContent[0]}
          </p>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light">
            {projects[current]?.storyContent[1]}
          </p>
          <div className="flex gap-4 mt-10">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:glow-purple-strong font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105">
              Case Study ansehen
            </Button>
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-purple font-semibold px-8 py-6 text-lg transition-all duration-300">
              Alle Projekte
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y border-border/20 glass-effect relative accent-line accent-line-bottom">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 text-center cta-section">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Bereit für<br />
            <span className="purple-gradient serif italic">Scroll-Stopping Content?</span>
          </h2>
          <p className="text-lg text-foreground/60 mb-10 max-w-2xl mx-auto font-light">
            Lassen Sie uns besprechen, wie wir Ihre Marke mit Premium-Kampagnen auf das nächste Level bringen können.
          </p>
          <Button size="lg" className="cta-button text-white font-bold px-12 py-6 text-lg border-0" asChild>
            <Link href="/erstgespraech">
              <span className="flex items-center gap-3">
                Zum kostenlosen Erstgespräch
                <span className="inline-block">→</span>
              </span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="border-y border-border/20 glass-effect relative accent-line accent-line-bottom">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Kontaktieren Sie uns<br />
                <span className="purple-gradient serif italic">gerne hier!</span>
              </h2>
              <h3 className="text-2xl font-bold mb-4">Interessiert an einer Zusammenarbeit?</h3>
              <p className="text-lg text-foreground/70 leading-relaxed font-light">
                Wir bemühen uns so schnell wie möglich zu antworten und freuen uns auf einen möglichen Austausch :)
              </p>
            </div>

            {/* Right Side - Form */}
            <div>
              {contactSubmitSuccess ? (
                <div id="contact-success-message" className="text-center py-12">
                  <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-green-500">Nachricht gesendet!</h3>
                  <p className="text-foreground/70 mb-6">Wir melden uns bald bei dir.</p>
                  <Button onClick={() => setContactSubmitSuccess(false)} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                    Weitere Nachricht senden
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="text-sm font-medium text-foreground/70 mb-4">Name (erforderlich)</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={contactForm.firstName}
                        onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                        placeholder="Vorname"
                        className={`w-full px-4 py-3 rounded-lg glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all ${
                          contactErrors.firstName ? "border-red-500" : "border-primary/20"
                        }`}
                      />
                      {contactErrors.firstName && <p className="text-sm text-red-500 mt-1">{contactErrors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={contactForm.lastName}
                        onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                        placeholder="Nachname"
                        className={`w-full px-4 py-3 rounded-lg glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all ${
                          contactErrors.lastName ? "border-red-500" : "border-primary/20"
                        }`}
                      />
                      {contactErrors.lastName && <p className="text-sm text-red-500 mt-1">{contactErrors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground/70 mb-2">E-Mail-Adresse (erforderlich)</div>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all ${
                        contactErrors.email ? "border-red-500" : "border-primary/20"
                      }`}
                    />
                    {contactErrors.email && <p className="text-sm text-red-500 mt-1">{contactErrors.email}</p>}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground/70 mb-2">Nachricht (erforderlich)</div>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg glass-effect border bg-background/50 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-purple transition-all resize-none ${
                        contactErrors.message ? "border-red-500" : "border-primary/20"
                      }`}
                    />
                    {contactErrors.message && <p className="text-sm text-red-500 mt-1">{contactErrors.message}</p>}
                  </div>
                  {contactErrors.submit && (
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm">{contactErrors.submit}</p>
                    </div>
                  )}
                  <Button type="submit" disabled={contactSubmitting} className="w-full bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:glow-purple font-bold py-6 text-lg transition-all duration-300">
                    {contactSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      "SENDEN"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
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
              <Link href="#" className="text-sm text-foreground/50 hover:text-primary hover:glow-purple transition-all duration-300">
                Instagram
              </Link>
              <Link href="#" className="text-sm text-foreground/50 hover:text-primary hover:glow-purple transition-all duration-300">
                TikTok
              </Link>
              <Link href="#" className="text-sm text-foreground/50 hover:text-primary hover:glow-purple transition-all duration-300">
                LinkedIn
              </Link>
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
