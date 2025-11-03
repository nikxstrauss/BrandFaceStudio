# 🚨 Schnelle Wiederherstellung - Emergency Commands

## Wenn etwas schief geht, nutze diese Befehle:

### 📦 Template komplett wiederherstellen
```bash
cd /home/project
tar -xzf brandface-studio/.same/templates/brandface-studio-v22-final.tar.gz -C brandface-studio-restored
cd brandface-studio-restored
bun install
bun run dev
```

### 📄 Einzelne Datei wiederherstellen
```bash
# Hauptseite:
cp brandface-studio/.same/backups/critical-files/page.tsx brandface-studio/src/app/

# Styles:
cp brandface-studio/.same/backups/critical-files/globals.css brandface-studio/src/app/

# Erstgespräch Form:
cp brandface-studio/.same/backups/critical-files/erstgespraech/page.tsx brandface-studio/src/app/erstgespraech/

# Brand Face Seite:
cp brandface-studio/.same/backups/critical-files/brand-face/page.tsx brandface-studio/src/app/brand-face/

# Carousel:
cp brandface-studio/.same/backups/critical-files/carousel.tsx brandface-studio/src/components/ui/
```

### 🔄 Git History nutzen
```bash
cd brandface-studio

# Alle Commits anzeigen:
git log --oneline

# Zu einem früheren Commit zurück:
git checkout COMMIT_HASH

# Zurück zur neuesten Version:
git checkout master
```

### 💾 Neues Backup erstellen
```bash
cd brandface-studio
git add .
git commit -m "Backup vor Änderungen"
tar -czf .same/backups/manual-backup-$(date +%Y%m%d-%H%M%S).tar.gz --exclude=node_modules --exclude=.next .
```

### 🔍 Prüfen welche Dateien geändert wurden
```bash
cd brandface-studio
git status
git diff
```

### ⏮️ Letzte Änderung rückgängig machen
```bash
cd brandface-studio
git reset --hard HEAD
```

---

**Wichtig**: Diese Befehle können Leben retten! 🛟
