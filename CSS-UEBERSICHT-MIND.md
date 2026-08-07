# CSS-ÜBERSICHT – M.I.N.D.-ARCHIV

Diese Übersicht basiert auf deiner aktuellen CSS-Datei.  
Sie erklärt, **welche Klasse oder ID wofür zuständig ist**, wo sie im HTML benutzt wird und welche Werte du gefahrlos ändern kannst.

---

## 1. Farben und Grundwerte

### `:root`
Hier liegen die wichtigsten Farben deiner gesamten Seite.

```css
:root {
  --red: #ff3c3c;
  --cyan: #34d9ff;
  --green: #45ff75;
  --yellow: #ffd54a;

  --text: #f4f7f8;
  --muted: #9ca9ad;

  --background: #020607;
  --panel: rgba(6, 15, 17, 0.96);
  --panel-light: rgba(9, 27, 30, 0.92);

  --line: rgba(52, 217, 255, 0.16);
}
```

**Bedeutung**

- `--red` = Warnungen, Überschriften, rote Balken
- `--cyan` = Untertitel, technische Linien, normale Dialoge
- `--green` = Online, freigegeben, Omega
- `--yellow` = Hinweise, unvollständig, Gamma
- `--text` = normale helle Schrift
- `--muted` = graue Nebeninformationen
- `--background` = Haupthintergrund
- `--panel` / `--panel-light` = dunkle Kastenfarben
- `--line` = dezente cyanfarbene Linien

**Farbe benutzen**

```css
color: var(--red);
background: var(--background);
```

---

## 2. Allgemeine CSS-Befehle

### `*`
```css
* {
  box-sizing: border-box;
}
```

Sorgt dafür, dass `padding` und `border` in der angegebenen Breite enthalten sind.

### `html`
```css
html {
  scroll-behavior: smooth;
}
```

Macht Sprünge zu Ankern weich.

### `body`
Steuert den Hintergrund, die Standardschrift und den gesamten Seitenbereich.

Wichtige Befehle:

- `margin: 0;` = entfernt den weißen Browserrand
- `min-height: 100vh;` = mindestens eine Bildschirmhöhe
- `font-family` = Standardschrift
- `background` = Hintergrundverläufe und Raster
- `overflow-x: hidden;` = verhindert horizontales Scrollen

### `button`
```css
button {
  font: inherit;
}
```

Buttons übernehmen die Schrift ihrer Umgebung.

---

# 3. Musik und Audio

## `.musicButton`
Schwebender Musikknopf unten rechts.

```html
<button class="musicButton">Musik</button>
```

Wichtige Werte:

- `position: fixed` = bleibt beim Scrollen sichtbar
- `right` = Abstand rechts
- `bottom` = Abstand unten
- `z-index` = liegt über anderen Elementen
- `padding` = Innenabstand
- `cursor: pointer` = Hand beim Darüberfahren

## `#audioToggle`
Der große Button zum Ein- und Ausschalten des Audios.

```html
<button id="audioToggle">Audio aktivieren</button>
```

### `#audioToggle.active`
Wird benutzt, wenn Audio aktiv ist.

```javascript
audioToggle.classList.add("active");
```

**Achtung:** `#audioToggle` ist in deiner CSS-Datei zweimal definiert. Die spätere Regel überschreibt viele Werte der früheren Regel.

---

# 4. Startbildschirm

## `.bootScreen`
Vollbild-Startfenster.

## `.bootScreen.hidden`
Blendet den Startbildschirm aus.

```javascript
bootScreen.classList.add("hidden");
```

## `.bootPanel`
Der große Kasten in der Mitte des Startbildschirms.

## `.bootLabel`
Kleine Beschriftung oben.

## `.bootTitle`
Große Hauptüberschrift.

## `.bootStatus`
Statusmeldung unter der Überschrift.

## `.bootBar`
Hintergrund des Ladebalkens.

## `.bootFill`
Der eigentliche bewegte Ladebalken.

## `.bootIdentity`
Kasten mit Benutzeridentität im Startfenster.

## `.bootIdentity.show`
Blendet den Identitätskasten ein.

## `.bootIdentityRow`
Eine Zeile im Identitätskasten.

## `.bootIdentityLabel`
Kleine Bezeichnung links.

## `.bootIdentityValue`
Wert rechts.

Zusätzliche Farben:

- `.omega`
- `.alpha`
- `.beta`
- `.gamma`
- `.delta`
- `.none`

## `.bootWelcome`
Begrüßungstext.

## `.bootWelcome.show`
Macht den Begrüßungstext sichtbar.

---

# 5. Scanner-Effekt

## `.screenScan`
Der rote Scannerbalken, der über die Seite läuft.

Wichtige Werte:

- `position: fixed`
- `top: -20px`
- `height: 6px`
- `opacity`
- `animation: screenScanner`

---

# 6. Gesamte Seite

## `.archiveApp`
Hauptcontainer der gesamten Seite.

```html
<div class="archiveApp">
```

Wichtige Werte:

- `width` = maximale Gesamtbreite
- `margin: 0 auto` = mittig ausrichten
- `padding` = Abstand oben und unten

---

# 7. Kopfzeile

## `.topBar`
Großer oberer Balken.

## `.brandArea`
Bereich mit Logo und Titel.

## `.brandLogo`
Das rote `M`.

## `.brandTitle`
Großer Seitentitel.

## `.brandSubtitle`
Kleiner Text unter dem Titel.

## `.onlineStatus`
Text „Online“ oder „Netzwerk verbunden“.

## `.onlineDot`
Grüner leuchtender Punkt.

**Achtung:** `.onlineDot` ist in deiner Datei zweimal vorhanden. Die spätere Regel überschreibt einzelne Werte.

---

# 8. Seitenaufteilung

## `.mainLayout`
Teilt die Seite in linkes Menü und rechten Inhalt.

```css
.mainLayout {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 18px;
}
```

- erster Wert `360px` = Breite des linken Bereichs
- zweiter Wert `1fr` = Restbreite für den Inhalt
- `gap` = Abstand zwischen beiden Bereichen

**Achtung:** Dein `.sideMenu` ist `400px` breit, aber `.mainLayout` reserviert nur `360px`. Dadurch kann das Menü in den Inhaltsbereich ragen. Beide Werte sollten gleich sein.

---

# 9. Linkes Menü

## `.sideMenu`
Der komplette linke Menüblock.

Wichtige Befehle:

- `position: sticky` = bleibt beim Scrollen sichtbar
- `top: 20px` = Abstand zum oberen Rand
- `align-self: start` = beginnt oben im Grid
- `width: 400px` = Breite
- `max-height: calc(100vh - 40px)` = maximale Höhe
- `overflow-y: auto` = eigener Scrollbalken
- `border-left` = roter Balken links
- `padding` = Innenabstand
- `background` = dunkler Hintergrund
- `transform: none` = keine Verschiebung

### Scrollbalken

#### `.sideMenu::-webkit-scrollbar`
Breite des Scrollbalkens.

#### `.sideMenu::-webkit-scrollbar-track`
Hintergrund hinter dem Schieber.

#### `.sideMenu::-webkit-scrollbar-thumb`
Der bewegliche Schieber.

**Wichtig:** CSS kann nicht festlegen, dass der Scrollbalken beim Laden immer oben steht. Dafür braucht man JavaScript:

```javascript
document.querySelector(".sideMenu").scrollTop = 0;
```

## `.menuSection`
Eine komplette Menükategorie.

## `.menuSection:last-child`
Entfernt die Linie beim letzten Menübereich.

## `.menuTitle`
Rote Überschrift einer Menükategorie.

## `.menuButton`
Ein einzelner Menüpunkt.

## `.menuButton:hover`
Aussehen beim Darüberfahren.

## `.menuButton.active`
Markierter, aktuell ausgewählter Menüpunkt.

---

# 10. Inhaltsbereich rechts

## `.contentArea`
Großer rechter Archivkasten.

Wichtige Werte:

- `position: relative`
- `min-height`
- `padding`
- `background`
- `border-left`
- `clip-path`
- `box-shadow`

## `.contentArea::before`
Die dünne rote Linie oben im Inhaltskasten.

## `.archiveLabel`
Kleine rote Zeile über der Hauptüberschrift.

## `.contentArea h1`
Große Hauptüberschrift einer Seite.

## `.archiveSubtitle`
Cyanfarbener Untertitel.

---

# 11. Alte Infokästen

## `.infoGrid`
Dreispaltiger Kachelbereich.

## `.infoBox`
Eine einzelne Infokachel.

## `.infoLabel`
Kleine Bezeichnung.

## `.infoValue`
Großer Wert.

## `.infoValue.green`
Grüner Wert.

**Achtung:** In deiner CSS steht:

```css
grid-template-columns: repeat(3, minmax(3, 1fr));
```

`minmax(3, 1fr)` ist ungültig. Richtig ist:

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
```

---

# 12. Geschichtentext

## `.storyText`
Fließtext für Kapitel oder Geschichten.

## `.storyText p`
Abstand zwischen Absätzen.

## `.storyText p:first-child::first-letter`
Großer roter Anfangsbuchstabe.

---

# 13. Gesperrte Akte

## `.lockedScreen`
Zentriert die gesperrte Akte.

## `.lockedPanel`
Roter Warnkasten.

## `.lockedIcon`
Großes Symbol.

## `.lockedTitle`
Große rote Überschrift.

## `.lockedText`
Kleiner Erklärungstext.

---

# 14. Animationen

## `@keyframes bootLoading`
Lässt den Ladebalken von 0 auf 100 Prozent wachsen.

## `@keyframes onlinePulse`
Lässt den grünen Onlinepunkt pulsieren.

## `@keyframes screenScanner`
Bewegt den Scannerbalken von oben nach unten.

---

# 15. Tablet- und Handyansicht

## `@media (max-width: 960px)`
Für Tablets und kleinere Bildschirme.

- Menü und Inhalt stehen untereinander
- Menü ist nicht mehr sticky
- Menüpunkte werden zweispaltig

## `@media (max-width: 680px)`
Für Handys.

- kleinere Seitenabstände
- Kacheln stehen untereinander
- Menü wird einspaltig
- Geschichtentext wird kleiner

Weitere Medienregeln existieren für:

- `900px`
- `760px`
- `1050px`
- `1100px`

---

# 16. Home-Button

## `.homeButton`
Quadratischer Button mit Haus-Symbol.

## `.homeButton svg`
Größe und Linien des SVG-Symbols.

## `.homeButton:hover`
Leuchteffekt beim Darüberfahren.

---

# 17. Home-Seite

## `.homeWelcome`
Großer Begrüßungskasten.

## `.homeWelcomeTitle`
Überschrift im Begrüßungskasten.

## `.homeWelcomeText`
Fließtext.

## `.homeStatusGrid`
Drei Statuskacheln.

## `.homeStatusCard`
Eine Statuskachel.

## `.homeStatusLabel`
Kleine Bezeichnung.

## `.homeStatusValue`
Großer Wert.

## `.homeStatusValue.green`
Grüner Statuswert.

## `.homeSectionTitle`
Rote Zwischenüberschrift.

## `.homeTileGrid`
Raster für große Home-Kacheln.

## `.homeTile`
Eine große Kachel.

## `button.homeTile`
Macht die Kachel anklickbar.

## `button.homeTile:hover`
Bewegung und Leuchten beim Darüberfahren.

## `.homeTile.lockedTile`
Gesperrte Home-Kachel.

## `.homeTileIcon`
Symbol der Kachel.

## `.homeTileTitle`
Kachelüberschrift.

## `.homeTileText`
Beschreibung.

## `.lockedTile .homeTileIcon::before`
Fügt ein Schloss-Symbol ein.

---

# 18. Artefaktarchiv

## `.artifactInfoGrid`
Vier Grunddatenkacheln für Masken und Artefakte.

**Achtung:** Auch hier steht ein ungültiger Wert:

```css
repeat(4, minmax(4, 1fr))
```

Richtig:

```css
repeat(4, minmax(0, 1fr))
```

## `.artifactInfoBox`
Eine Artefaktkachel.

## `.artifactInfoLabel`
Kleine Bezeichnung.

## `.artifactInfoValue`
Großer Wert.

## `.dangerValue`
Roter gefährlicher Wert.

---

# 19. Warnungen

## `.artifactWarning`
Warnkasten mit rotem Balken.

## `.artifactWarningTitle`
Rote Warnüberschrift.

## `.artifactWarning p`
Text im Warnkasten.

---

# 20. Archivdokument

## `.archiveDocument`
Kompletter Dokumenttext.

## `.archiveDocument h2`
Abschnittsüberschriften.

## `.archiveDocument p`
Absatzabstand.

## `.archiveEmphasis`
Großer hervorgehobener Text.

**Wichtig:** Weiter unten wird `.archiveDocument` durch Regeln mit `#contentArea` teilweise überschrieben.

---

# 21. Zitate

## `.artifactQuote`
Großer Zitatkasten.

## `.artifactQuoteMark`
Großes Anführungszeichen links.

## `.artifactQuoteText`
Text des Zitats.

---

# 22. Maskenübersicht

## `.maskOverviewGrid`
Zweispaltiges Raster.

## `.maskOverviewCard`
Eine Maskenkarte.

## `button.maskOverviewCard`
Anklickbare Maskenkarte.

## `button.maskOverviewCard:hover`
Hovereffekt.

## `.maskNumber`
Nummer der Maske.

## `.maskOverviewName`
Name.

## `.maskOverviewTitle`
Untertitel.

## `.maskOverviewStatus`
Status.

## `.unlockedStatus`
Grüner Status.

## `.lockedArtifact`
Blendet gesperrte Masken ab.

---

# 23. Offenbarungszeilen

## `.revelationLines`
Kasten für mehrere wichtige Zeilen.

## `.revelationLines span`
Einzelne Zeile.

---

# 24. M.I.N.D.-Analyse

## `.classifiedBlock`
Cyanfarbener Analyse- oder Geheimblock.

## `.classifiedHeader`
Überschrift.

## `.classifiedText`
Textabsatz.

---

# 25. Benutzerterminal

## `.userTerminal`
Kompletter Benutzerkasten oben rechts.

## `.userTerminalHeader`
Oberer Systembereich.

## `.userTerminalStatus`
Netzwerkstatus.

## `.systemHeaderText`
Kleiner Systemtext.

**Achtung:** `.systemHeaderText` ist zweimal definiert. Die spätere Regel überschreibt den Abstand.

## `.userTerminalBody`
Unterer Bereich.

## `.userTerminalUser`
Benutzername-Gruppe.

## `.userTerminalName`
Name.

## `.userTerminalStats`
Raster für Rang und Level.

## `.userTerminalField`
Ein Feld.

## `.userTerminalLabel`
Kleine Beschriftung.

## `.userTerminalValue`
Großer Wert.

### Rangfarben

- `.accessOmega` = grün
- `.accessAlpha` = rot
- `.accessBeta` = cyan
- `.accessGamma` = gelb
- `.accessDelta` = grau

Diese Klassen existieren sowohl allein als auch zusammen mit `.userTerminalValue`.

---

# 26. Aktenstatus

- `.statusReleased` = grün
- `.statusIncomplete` = gelb
- `.statusDamaged` = rot
- `.statusClassified` = lila

Beispiel:

```html
<span class="statusValue statusDamaged">BESCHÄDIGT</span>
```

---

# 27. Beschädigte Daten

## `.damagedData`
Rot gestreifter Block für beschädigte Daten.

## `.redactedText`
Schwärzt Text.

```html
<span class="redactedText">GEHEIM</span>
```

---

# 28. Verknüpfte Akten

## `.relatedFiles`
Gesamter Bereich.

## `.relatedFilesTitle`
Rote Überschrift.

## `.relatedFilesGrid`
Zweispaltiges Raster.

## `.relatedFile`
Eine verknüpfte Akte.

## `.relatedFile:hover`
Hovereffekt.

## `.relatedFileId`
Aktennummer.

## `.relatedFileName`
Name.

## `.relatedFileLocked`
Abgeblendete gesperrte Akte.

---

# 29. Kommandozentrale

## `.commandDashboard`
Großer Dashboard-Kasten.

## `.commandDashboardHeader`
Oberer Bereich.

## `.commandDashboardLabel`
Kleine Überschrift.

## `.commandDashboardUser`
Benutzername.

## `.commandOnline`
Onlineanzeige.

## `.commandStatusGrid`
Vier Statuskacheln.

## `.commandStatusCard`
Eine Kachel.

## `.commandStatusLabel`
Kleine Bezeichnung.

## `.commandStatusValue`
Großer Wert.

## `.commandStatusDescription`
Beschreibung.

## `.onlineValue`
Grüner Wert.

## `.lockedValue`
Roter Wert.

---

# 30. Archivkategorien

## `.archiveCategoryGrid`
Zweispaltiges Raster.

## `.archiveCategoryCard`
Große Kategorie-Kachel.

## `.archiveCategoryCard:hover`
Hovereffekt.

## `.archiveCategoryCard.lockedTile`
Gesperrte Kategorie.

## `.archiveCategoryCode`
Großer Code.

## `.archiveCategoryTitle`
Titel.

## `.archiveCategoryText`
Beschreibung.

## `.archiveCategoryStatus`
Status.

## `.lockedTile .archiveCategoryStatus`
Roter Sperrstatus.

## `.lockedTile .archiveCategoryStatus::before`
Schloss-Symbol.

---

# 31. Systemmeldungen

## `.systemMessagePanel`
Gesamter Nachrichtenkasten.

## `.systemMessage`
Eine Nachricht.

## `.systemMessage:last-child`
Entfernt die letzte Trennlinie.

## `.systemMessageTime`
Zeit oder Kategorie.

## `.systemMessage strong`
Überschrift.

## `.systemMessage p`
Nachrichtentext.

## `.warningMessage`
Macht Zeit und Überschrift rot.

---

# 32. Aktualisierungsprotokoll

## `.updateLog`
Gesamte Liste.

## `.updateLogEntry`
Ein Eintrag.

## `.updateLogMarker`
Grünes Symbol.

## `.updateLogEntry strong`
Überschrift.

## `.updateLogEntry p`
Beschreibung.

---

# 33. Systemfuß

## `.systemFooter`
Unterste Informationszeile.

---

# 34. Identität in der Kommandozentrale

## `.commandIdentity`
Gesamter Identitätsbereich.

## `.commandIdentityGrid`
Raster.

## `.commandIdentityItem`
Eine Kachel.

## `.commandIdentityTitle`
Kachel über gesamte Breite.

## `.commandIdentityLabel`
Kleine Bezeichnung.

## `.commandIdentityValue`
Großer Wert.

### Rangfarben

- `.rankOmega`
- `.rankAlpha`
- `.rankBeta`
- `.rankGamma`
- `.rankDelta`

---

# 35. Leitsatz

## `.commandMotto`
Kasten für den Leitsatz.

## `.commandMottoLabel`
Kleine rote Beschriftung.

## `.commandMottoText`
Großer kursiver Text.

---

# 36. Bilder

## `.artifactImageFrame`
Rahmen um ein Bild.

## `.artifactImage`
Das Bild selbst.

## `.imageSmall`
Kleines Bild.

## `.imageMedium`
Mittleres Bild.

## `.imageLarge`
Großes Bild.

## `.imageWide`
Breites Bild.

## `.imageFull`
Volle Breite.

## `.imageCustom`
Eigene Bildbreite.

Beispiel:

```html
<img
  src="images/figur.png"
  class="artifactImage imageCustom"
  style="--image-width: 560px"
>
```

**Achtung:** Die Bildgrößen sind zweimal definiert. Die späteren Regeln innerhalb von `#contentArea` gewinnen.

---

# 37. Einheitliches Archivdesign

## `#contentArea h2`
Alle roten Abschnittsüberschriften im Inhaltsbereich.

## `#contentArea .archiveSectionTitle`
Alternative Klasse für Abschnittsüberschriften.

## `#contentArea h3`
Kleine cyanfarbene Unterüberschriften.

## `#contentArea p`
Normale Absätze.

## `#contentArea li`
Listeneinträge.

## `#contentArea .archiveText`
Archivtext.

## `#contentArea .archiveDocument`
Dokumenttext.

## `#contentArea .storyText`
Geschichtentext.

Diese Regeln sind sehr stark, weil `#contentArea` eine ID ist. Sie überschreiben viele ältere Klassen.

---

# 38. Neue Statuskacheln

## `.statusGrid`
Drei Statuskacheln.

```html
<div class="statusGrid">
```

## `.statusCard`
Eine Kachel.

## `.statusLabel`
Kleine Bezeichnung.

## `.statusValue`
Großer Wert.

Beispiel:

```html
<div class="statusCard">
  <span class="statusLabel">ARCHIVSTATUS</span>
  <span class="statusValue statusReleased">FREIGEGEBEN</span>
</div>
```

---

# 39. Neue Detailkacheln

## `.detailGrid`
Vier Grunddatenkacheln.

## `.detailCard`
Eine Kachel.

## `.detailLabel`
Kleine Bezeichnung.

## `.detailValue`
Großer Wert.

---

# 40. Fähigkeiten

## `.abilityList`
Alle Fähigkeiten untereinander.

## `.abilityCard`
Eine einzelne Fähigkeit.

```html
<div class="abilityList">
  <div class="abilityCard">
    <h3>FÄHIGKEIT</h3>
    <p>Beschreibung</p>
  </div>
</div>
```

---

# 41. Rituale

## `.ritualBlock`
Cyanfarbener Ritualkasten.

## `.ritualBlockDanger`
Rote gefährliche Variante.

## `.ritualLabel`
Kleine rote Beschriftung.

## `.ritualText`
Lateinischer Ritualtext.

## `.ritualTranslation`
Übersetzung.

---

# 42. Dialoge

## `.storyDialogue`
Normaler Dialog in Cyan.

```html
<div class="storyDialogue">
  „Wo sind wir?“
</div>
```

## `.storyDialogueLoud`
Geschriener oder besonders lauter Dialog in Rot.

```html
<div class="storyDialogue storyDialogueLoud">
  „NEIN!“
</div>
```

**Wichtig:** In deiner aktuellen Regel für `.storyDialogue` fehlen `margin`, `padding` und `border-left-style`. Wenn kein anderer Block diese Werte liefert, wird eventuell kein sichtbarer Balken angezeigt.

Eine vollständige Version wäre:

```css
.storyDialogue {
  margin: 22px 0;
  padding-left: 18px;
  border-left: 3px solid var(--cyan);
  color: var(--cyan);
  font-family: Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
```

---

# 43. Häufig verwendete Befehle einfach erklärt

## Abstände

```css
margin: 20px 7px 74px 32px;     oben – rechts – unten – links
margin: 20px 7px                oben/unten - rechts/links
margin: 20px                    alles gleich
```
Abstand außerhalb eines Elements.

```css
padding: 20px 2px 7px 92px;      oben – rechts – unten – links
padding: 20px 7px                oben/unten - rechts/links
padding: 20px                    alles gleich
```
Abstand innerhalb eines Elements.

## Breite und Höhe

```css
width: 400px;
height: 100px;
min-height: 100px;
max-height: 500px;
```

## Rahmen

```css
border: 1px solid red;
border-left: 4px solid red;
border-radius: 10px;
```

## Farben

```css
color: white;
background: black;
background-color: black;
```

## Schrift

```css
font-size: 18px;
font-weight: 900;
font-family: Arial, sans-serif;
font-style: italic;
letter-spacing: 2px;
line-height: 1.6;
text-transform: uppercase;
text-align: center;
```

## Positionierung

```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

- `static` = normal
- `relative` = Bezugspunkt für absolute Elemente
- `absolute` = frei im nächsten positionierten Elternteil
- `fixed` = fest im Browserfenster
- `sticky` = bleibt ab einer Stelle hängen

## Position

```css
top: 20px;
right: 20px;
bottom: 20px;
left: 20px;
```

## Flexbox

```css
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
flex-direction: column;
```

## Grid

```css
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 12px;
```

## Sichtbarkeit

```css
opacity: 0;
visibility: hidden;
display: none;
```

## Scrollen

```css
overflow-y: auto;
overflow-x: hidden;
```

## Bewegung

```css
transform: translateY(-4px);
transform: scale(1.08);
transition: 0.25s ease;
```

## Schatten

```css
box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
text-shadow: 0 0 10px red;
```

## Vordergrundebene

```css
z-index: 1000;
```

Je höher der Wert, desto weiter liegt das Element vorne.

## Pseudoklassen

```css
:hover
.active
:last-child
:first-child
```

## Pseudoelemente

```css
::before
::after
::first-letter
::-webkit-scrollbar
```

---

# 44. Wichtige Auffälligkeiten in deiner aktuellen CSS

1. `.sideMenu` ist 400 Pixel breit, `.mainLayout` reserviert aber nur 360 Pixel.
2. `.infoGrid` enthält `minmax(3, 1fr)` – das ist ungültig.
3. `.artifactInfoGrid` enthält `minmax(4, 1fr)` – das ist ungültig.
4. `#audioToggle` ist doppelt definiert.
5. `.onlineDot` ist doppelt definiert.
6. `.systemHeaderText` ist doppelt definiert.
7. Bildgrößen sind zweimal definiert.
8. Die starken Regeln mit `#contentArea` überschreiben ältere Text- und Überschriftsregeln.
9. `.storyDialogue` besitzt aktuell keinen vollständigen Rahmenbefehl.
10. Das Menü scrollt selbständig, weil `overflow-y: auto` und `max-height` gesetzt sind.

---

# 45. Empfohlene Grundstruktur im HTML

```html
<div class="archiveApp">

  <header class="topBar">
    ...
  </header>

  <div class="mainLayout">

    <nav class="sideMenu">
      ...
    </nav>

    <main id="contentArea" class="contentArea">

      <div class="archiveLabel">M.I.N.D.-ARCHIV</div>

      <h1>TITEL</h1>

      <div class="archiveSubtitle">UNTERTITEL</div>

      <div class="statusGrid">
        ...
      </div>

      <div class="detailGrid">
        ...
      </div>

      <article class="archiveDocument">
        ...
      </article>

    </main>

  </div>

</div>
```

---

# 46. Merksatz

Je genauer ein CSS-Selektor ist und je weiter unten er steht, desto eher gewinnt er.

Beispiel:

```css
.archiveDocument h2 {
  color: cyan;
}

#contentArea h2 {
  color: red;
}
```

Hier gewinnt `#contentArea h2`, weil die ID `#contentArea` stärker ist.

