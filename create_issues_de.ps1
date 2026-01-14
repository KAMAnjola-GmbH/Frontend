
# Issue 1
gh issue create --title "[Refactor] Zentralisierung der API-Kommunikation und Typendefinitionen (SusaAPI)" --body "Aktuell herrscht Chaos im Code: fetch wird manuell in Komponenten und Hooks aufgerufen, und Typen sind dupliziert.`n`nAufgaben:`n- [ ] Alle Netzwerkaufrufe von useSusaProjects.ts und ProjectContext.tsx nach services/susaApi.ts verschieben.`n- [ ] URL-Konfiguration vereinheitlichen (Wahl zwischen Next.js Proxy und direkter API-Verbindung).`n- [ ] Eine Datei types/index.ts (oder types/domain.ts) erstellen und lokale Schnittstellendefinitionen (z. B. Project vs. SusaProject) entfernen.`n- [ ] Duplizierten Zustand entfernen (Entscheidung: entweder Context, Hook oder React Query)."

# Issue 2
gh issue create --title "[Cleanup] Entfernung von totem Code und Optimierung der Assets" --body "Der Code enthält ungenutzte Fragmente und nicht optimierte Medien.`n`nAufgaben:`n- [ ] Toten Code entfernen (z. B. viewerRef in MainContent.tsx).`n- [ ] Große Inline-SVGs in separate Komponenten auslagern (src/components/ui/icons/*).`n- [ ] Video auf der Startseite optimieren (poster-Bild hinzufügen, Komprimierung oder Lazy Loading), um den mobilen Datentransfer nicht zu überlasten."

# Issue 3
gh issue create --title "[Feat] Vollständige Integration der SUSA-Backend-Methoden" --body "Sicherstellen, dass alle API-Endpunkte korrekt mit dem Frontend funktionieren.`n`nAufgaben:`n- [ ] Verifizierung des Datei-Uploads.`n- [ ] Verifizierung des Analyseprozesses (Start/Stopp/Status).`n- [ ] Verbesserung der SignalR-Handhabung (Entfernung von Hacks mit useRef zugunsten korrekter Zustandsverwaltung).`n- [ ] API-Fehlerbehandlung (Anzeige verständlicher Nachrichten in useNotifications)."

# Issue 4
gh issue create --title "[Feat] Implementierung des Benutzer-Dashboards" --body "Schaffung eines zentralen Ortes, an dem der Benutzer seine Statistiken und Projekte sieht.`n`nAufgaben:`n- [ ] Bereich 'Letzte Projekte' (Liste/Kacheln).`n- [ ] KPI-Diagramme (Verwendung der Diagrammbibliothek aus package.json).`n- [ ] Aufgabenstatus in Echtzeit."

# Issue 5
gh issue create --title "[Feat] Administrator-Panel (Backoffice)" --body "Panel nur für die Rolle Admin zur Systemverwaltung.`n`nAufgaben:`n- [ ] Benutzertabelle (Listenansicht, Blockieren, Rollenbearbeitung).`n- [ ] Systemprotokolle (Vorschau auf das, was im System passiert).`n- [ ] Verwaltung globaler Anwendungseinstellungen.`n- [ ] Guard (Routing-Schutz) für /admin."

# Issue 6
gh issue create --title "[Feat] Neue Unterseite: Workshop" --body "Seite für Workshops/Schulungen.`n`nAufgaben:`n- [ ] Layout der Workshop-Seite.`n- [ ] Liste verfügbarer Workshops (Abruf über API oder CMS).`n- [ ] Anmeldeformular für Workshops."

# Issue 7
gh issue create --title "[Feat] Neue Unterseite: MyWorkBench" --body "Arbeitsbereich des Benutzers (mögliche SUSA-Erweiterung).`n`nAufgaben:`n- [ ] Implementierung der Arbeitsoberfläche.`n- [ ] Integration mit Bearbeitungs-/Simulationstools."

# Issue 8
gh issue create --title "[Feat] Neue Unterseite: Learn (Wissensdatenbank)" --body "Bildungszentrum für Benutzer.`n`nAufgaben:`n- [ ] Bereich mit Tutorials (Video/Text).`n- [ ] FAQ.`n- [ ] Technische Dokumentation."

# Issue 9
gh issue create --title "[Feat] Implementierung der Sprachumschaltung (DE/EN)" --body "Die Anwendung muss Deutsch und Englisch unterstützen.`n`nAufgaben:`n- [ ] Installation und Konfiguration der Bibliothek (empfohlen next-intl).`n- [ ] Extraktion aller Strings in JSON-Dateien (en.json, de.json).`n- [ ] Hinzufügen eines Sprachumschalters (Language Switcher) in der Navigationsleiste.`n- [ ] Sicherstellen, dass sich die URL je nach Sprache ändert (z. B. /en/dashboard, /de/dashboard)."

# Issue 10
gh issue create --title "[UI] RWD-Korrekturen und mobile Optimierung" --body "Die Anwendung muss auf Telefonen und Tablets perfekt aussehen.`n`nAufgaben:`n- [ ] Audit der Navigationsleiste auf Mobilgeräten (Hamburger-Menü).`n- [ ] Anpassung von Tabellen (z. B. horizontaler Scroll oder Kartenansicht auf Mobilgeräten).`n- [ ] Überprüfung der Schriftgrößen und Schaltflächen (Touch).`n- [ ] Testen auf Auflösungen ab 320px."

# Issue 11
gh issue create --title "[Legal] Cookie-Banner gemäß EU-Richtlinie" --body "Implementierung eines Mechanismus zur Zustimmung zu Cookies.`n`nAufgaben:`n- [ ] Modal/Banner mit Optionen: Notwendig, Analytisch, Marketing.`n- [ ] Blockieren von Skripten (z. B. Google Analytics) vor Erteilung der Zustimmung.`n- [ ] Speichern der Benutzerpräferenzen."

# Issue 12
gh issue create --title "[Legal] Hinzufügen rechtlicher Seiten: Kontakt, Impressum, Datenschutzerklärung" --body "Gesetzlich erforderliche Informationsseiten.`n`nAufgaben:`n- [ ] Seite /contact mit Kontaktformular.`n- [ ] Seite /imprint (Impressum - erforderlich in DACH).`n- [ ] Seite /privacy-policy (Data Policy / Datenschutz).`n- [ ] Verlinkung dieser Seiten im Footer."
