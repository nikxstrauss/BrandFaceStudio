# 🛡️ Backup & Recovery Guide - Brand Face Studio

## ⚠️ Wichtig: Wie du Datenverlust verhinderst

### 🔄 Mehrfache Sicherungsstrategien

## 1️⃣ Git Repository (BEREITS ERSTELLT ✅)

Das Projekt ist jetzt ein Git Repository. Alle Änderungen sind gesichert.

### GitHub Backup erstellen:
```bash
# 1. Gehe zu github.com und erstelle ein neues Repository "brandface-studio"
# 2. Dann führe diese Befehle aus:
cd brandface-studio
git remote add origin https://github.com/DEIN-USERNAME/brandface-studio.git
git push -u origin master
```

### Regelmäßig committen:
```bash
# Nach jeder wichtigen Änderung:
git add .
git commit -m "Beschreibung der Änderung"
git push origin master
```

## 2️⃣ Template Archive (BEREITS ERSTELLT ✅)

**Gespeichert in**: `.same/templates/brandface-studio-v22-final.tar.gz`

### Template wiederherstellen:
```bash
# Falls etwas schief geht, entpacke das Template:
cd /home/project
tar -xzf brandface-studio/.same/templates/brandface-studio-v22-final.tar.gz
```

## 3️⃣ Wichtige Dateien sichern

### Diese Dateien sind am wichtigsten:
- ✅ `src/app/page.tsx` - Hauptseite mit Carousel & Typewriter
- ✅ `src/app/globals.css` - Alle Styles & Animationen
- ✅ `src/app/erstgespraech/page.tsx` - Multi-Step Form
- ✅ `src/app/brand-face/page.tsx` - Brand Face Seite
- ✅ `src/app/ClientBody.tsx` - Reaktiver Hintergrund
- ✅ `src/components/ui/carousel.tsx` - Carousel Komponente
- ✅ `package.json` - Alle Dependencies

### Backup dieser Dateien erstellen:
```bash
mkdir -p brandface-studio/.same/backups/critical-files
cp src/app/page.tsx .same/backups/critical-files/
cp src/app/globals.css .same/backups/critical-files/
cp src/app/erstgespraech/page.tsx .same/backups/critical-files/
cp src/app/brand-face/page.tsx .same/backups/critical-files/
cp src/app/ClientBody.tsx .same/backups/critical-files/
cp src/components/ui/carousel.tsx .same/backups/critical-files/
cp package.json .same/backups/critical-files/
```

## 4️⃣ Version History in Same IDE

**Alle Versionen sind in Same gespeichert!**
- Version 22 (FINAL): Purple send button, optimized spacing
- Version 19: Fixed spacing issues
- Version 16: Typewriter animation added
- Version 14: Fixed glow clipping
- Version 12: Fixed carousel centering

### Wiederherstellen:
Klicke auf "Versions" → Wähle eine Version → "Revert to version"

## 5️⃣ Externe Backups

### Option A: Download als ZIP
1. Rechtsklick auf `brandface-studio` Ordner
2. "Download" → Speichere auf deinem Computer

### Option B: Cloud Backup (Empfohlen)
- GitHub (siehe oben)
- GitLab
- Bitbucket
- Google Drive / Dropbox (als ZIP)

## 🚨 Was tun bei Datenverlust?

### Schritt 1: Prüfe Git History
```bash
cd brandface-studio
git log --oneline
git checkout COMMIT_HASH
```

### Schritt 2: Template wiederherstellen
```bash
tar -xzf .same/templates/brandface-studio-v22-final.tar.gz -C /tmp/restore
# Kopiere benötigte Dateien zurück
```

### Schritt 3: Same Version History nutzen
Klicke in Same IDE auf eine alte Version und revert

### Schritt 4: Critical Files Backup
```bash
cp .same/backups/critical-files/* src/app/
```

## 📋 Checkliste: Vor großen Änderungen

- [ ] `git add . && git commit -m "Before making changes"`
- [ ] `git push origin master` (falls GitHub verbunden)
- [ ] Neue Version in Same erstellen
- [ ] Template-Backup aktualisieren (optional)

## 🔐 Best Practices

1. **Committe oft** - Nach jeder wichtigen Änderung
2. **Push zu GitHub** - Mindestens täglich
3. **Versioniere in Same** - Nach jedem Feature
4. **Teste vor dem Löschen** - Niemals Files direkt löschen ohne Backup

## 📞 Im Notfall

Wenn alles verloren ist:
1. Check `.same/templates/brandface-studio-v22-final.tar.gz`
2. Check `.same/backups/critical-files/`
3. Check Same Version History
4. Check Git log: `git log --all --graph`
5. Check GitHub (falls gepusht)

---

**Erstellt**: Version 22
**Status**: Alle Backups aktiv ✅
**Sicherheitslevel**: MAXIMUM 🛡️
