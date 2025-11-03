# Brandface Studio Template v22 - Final Version

## 📦 Template Overview
This is the complete, production-ready Brandface Studio website template with all features from Version 67 restored and enhanced.

## ✨ Features Included

### 🎨 Design & Branding
- Dark navy background with purple/pink gradient branding
- Reactive gradient background with animated orbs
- Professional typography (Figtree + Noto Serif Display)
- Glass effects, glow effects, and smooth animations

### 🎬 Video Carousel
- 3 videos displayed at once (1 center active + 2 sides)
- Center video: 360px, auto-plays, shows description on hover
- Side videos: 260px, permanently show description
- Vertical aspect ratio (9:16) like TikTok/Reels
- Purple border with subtle glow effect
- Hover effects: center video scales to 108% with enhanced glow
- Carousel indicator dots for navigation
- Dynamic content updates with carousel changes

### 🎯 Interactive Elements
- **Typewriter Animation**: Header alternates between "Brand Faces" and "Kampagnen"
- **Hover Effects**: Smooth transitions on all interactive elements
- **Purple Send Button**: Contact form with subtle scale and glow on hover

### 📊 Dynamic Content
- **5 Case Studies**: CocaCola x Oreo, Österreich Werbung, Peek & Cloppenburg, willhaben, TUI BLUE
- **Stats Section**: Follower, Likes, Aufrufe - updates with carousel
- **Case Study Section**: Dynamic title and content that changes with carousel

### 📋 Forms & Pages
- **Contact Form**: Full validation with real-time error feedback
- **Erstgespräch Form**: Multi-step form (goals, budget, timeframe, contact, message)
- **Brand Face Page**: Application page with detailed info
- All forms have purple themed buttons with hover effects

### 🎨 Styling
- Spacing optimized for balanced layout
- Reduced negative space between sections
- Purple gradient buttons throughout
- Responsive design for all screen sizes

## 🛠️ Technical Stack
- **Framework**: Next.js 15.3.2 with App Directory
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Carousel**: embla-carousel-react
- **Package Manager**: Bun

## 📁 Project Structure
```
brandface-studio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── erstgespraech/        # Multi-step form page
│   │   ├── brand-face/           # Brand Face application page
│   │   ├── ClientBody.tsx        # Reactive gradient background
│   │   └── globals.css           # Global styles & animations
│   ├── components/
│   │   └── ui/                   # shadcn UI components
│   └── api/
│       ├── contact/              # Contact form API
│       └── brand-face/           # Brand Face form API
```

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Run Development Server**:
   ```bash
   bun run dev
   ```

3. **Build for Production**:
   ```bash
   bun run build
   ```

## 📝 Key Components

### Main Page Features
- Typewriter animation in header
- Video carousel with 5 case studies
- Dynamic stats that update with carousel
- Case study section with dynamic content
- CTA section
- Contact form
- Footer with social links

### Color Scheme
- Primary: `#a855f7` (Purple)
- Secondary: `#ec4899` (Pink)
- Background: `#000000` (Black)
- Foreground: `#ffffff` (White)

## 🎨 Custom Animations
- `typewriter`: Blinking cursor effect
- `pulse-on-hover`: Purple pulse effect
- `glow-purple`: Purple glow effect
- `animated-gradient`: Shifting gradient background
- `statsFade`: Stats number transition

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Customization

### Change Projects
Edit the `projects` array in `src/app/page.tsx` to add/modify case studies.

### Change Colors
Update Tailwind config or CSS variables in `src/app/globals.css`.

### Add New Forms
Use the existing form patterns in `erstgespraech` and `brand-face` pages.

## 📦 Version History
- **v22**: Final version with purple send button and optimized spacing
- **v19**: Drastically reduced spacing between videos and title
- **v16**: Added typewriter animation
- **v15**: Reduced glow effects
- **v14**: Fixed glow clipping
- **v12-13**: Fixed carousel centering and hover effects

## 📄 License
This template is for Brand Face Studio use.

---

**Created**: November 2025
**Last Updated**: Version 22
**Status**: Production Ready ✅
