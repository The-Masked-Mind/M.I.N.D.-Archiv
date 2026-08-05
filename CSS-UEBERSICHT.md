# M.I.N.D.-Archiv – CSS-Übersicht

Diese Datei erklärt die wichtigsten Klassen. Die ausführlichen Kommentare stehen zusätzlich direkt in `style.css`.

## Die drei wichtigsten Kachelbereiche

### 1. `statusGrid`
Die oberen drei Kacheln einer Akte:
- Archivstatus
- Sicherheitsstufe
- Aktenkennung

Unterklassen:
- `statusCard` = eine Kachel
- `statusLabel` = kleine Bezeichnung
- `statusValue` = großer Wert

### 2. `detailGrid`
Die vier Grunddaten einer Entität oder Maske:
- Klassifizierung
- Gefahrenstufe
- Status
- letzte Sichtung / bekannte Träger

Unterklassen:
- `detailCard` = eine Kachel
- `detailLabel` = kleine Bezeichnung
- `detailValue` = großer Wert

### 3. `abilityList`
Fähigkeiten untereinander.

Unterklassen:
- `abilityCard` = eine Fähigkeit
- `h3` = rote Fähigkeitsüberschrift
- `p` = Beschreibung

## Bilder individuell ändern

Direkt am Bild eine Größenklasse verwenden:

```html
<img class="artifactImage imageSmall" ...>
<img class="artifactImage imageMedium" ...>
<img class="artifactImage imageLarge" ...>
<img class="artifactImage imageWide" ...>
<img class="artifactImage imageFull" ...>
```

Eigene Größe:

```html
<img
  class="artifactImage imageCustom"
  style="--image-width: 560px"
  src="..."
>
```

## Farben

- `statusReleased` = grün
- `dangerValue` = rot
- normale Werte = weiß

## Wichtiger Hinweis

Für neue Akten bitte die bestehenden Dateien `slasher.html` oder `kondor.html` als Vorlage kopieren. Dadurch bleiben Aufbau und Design einheitlich.
