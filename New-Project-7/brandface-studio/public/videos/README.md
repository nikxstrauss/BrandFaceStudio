# Video Upload Anleitung

## So lädst du Videos hoch:

1. **Lade deine Videos in diesen Ordner hoch** (`public/videos/`)

2. **Benenne die Videos wie folgt:**
   - `coca-cola.mp4` - für CocaCola x Oreo Projekt
   - `oesterreich.mp4` - für Österreich Werbung Projekt
   - `peek.mp4` - für Peek & Cloppenburg Projekt
   - `willhaben.mp4` - für willhaben Projekt
   - `tui.mp4` - für TUI BLUE Projekt

3. **Nach dem Upload:**
   - Öffne `src/app/page.tsx`
   - Setze `hasVideo: true` für jedes Projekt, für das du ein Video hochgeladen hast

## Video-Format Empfehlungen:

- **Format:** MP4 (H.264)
- **Auflösung:** 1080x1920 (9:16 TikTok/Instagram Format)
- **Dateigröße:** Max. 50MB pro Video
- **Dauer:** 10-30 Sekunden optimal

## Beispiel:

Wenn du ein Video für CocaCola hochgeladen hast, ändere in `page.tsx`:

```typescript
{
  title: "CocaCola x Oreo",
  hasVideo: true,  // ← Ändere dies von false zu true
  // ...
}
```

Die Videos werden automatisch:
- Im Carousel angezeigt
- Automatisch abgespielt wenn sie in der Mitte sind
- Mit schönen Animationen und Übergängen versehen
