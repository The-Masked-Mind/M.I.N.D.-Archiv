const bootScreen =
  document.getElementById("bootScreen");

const bootStatus =
  document.getElementById("bootStatus");

const contentArea =
  document.getElementById("contentArea");

const menuButtons =
  document.querySelectorAll(".menuButton");


/* =========================
   STARTSEQUENZ
========================= */

const bootSteps = [
  {
    time: 1000,
    text: "IDENTITÄT WIRD GEPRÜFT..."
  },
  {
    time: 3000,
    text: "SICHERHEITSFREIGABE WIRD GELADEN..."
  },
  {
    time: 5000,
    text: "ARCHIVZUGRIFF GENEHMIGT..."
  },
  {
    time: 7000,
    text: "AKTE WIRD ENTSCHLÜSSELT..."
  }
];

bootSteps.forEach(step => {
  setTimeout(() => {
    bootStatus.textContent = step.text;
  }, step.time);
});

setTimeout(() => {
  bootScreen.classList.add("hidden");
}, 9000);

/* =========================
   STARTSEITE
========================= */

/* =========================
   HOME-SEITE
========================= */

const homeContent = `
  <div class="archiveLabel">
    M.I.N.D. ARCHIVE OS
  </div>

  <h1>
    ARCHIVZENTRALE
  </h1>

  <div class="archiveSubtitle">
    CHRONIKEN DER DUNKELHEIT
  </div>


  <section class="homeWelcome">

    <h2 class="homeWelcomeTitle">
      WILLKOMMEN IM ARCHIV
    </h2>

    <p class="homeWelcomeText">
      Du befindest dich im digitalen Archiv der
      Chroniken der Dunkelheit.
      Hier kannst du alle Akten einsehen, die du bereits
      durch Kanalpunkte freigeschaltet hast.
    </p>

    <p class="homeWelcomeText">
      Weitere Kapitel, Personen, Masken und Wesen bleiben
      verschlüsselt, bis deine Sicherheitsfreigabe
      erweitert wurde.
    </p>

  </section>


  <section class="homeStatusGrid">

    <div class="homeStatusCard">

      <span class="homeStatusLabel">
        FREIGESCHALTETE AKTEN
      </span>

      <span class="homeStatusValue green">
        1
      </span>

    </div>


    <div class="homeStatusCard">

      <span class="homeStatusLabel">
        GESPERRTE AKTEN
      </span>

      <span class="homeStatusValue">
        7
      </span>

    </div>


    <div class="homeStatusCard">

      <span class="homeStatusLabel">
        SICHERHEITSSTUFE
      </span>

      <span class="homeStatusValue">
        ALPHA
      </span>

    </div>

  </section>


  <div class="homeSectionTitle">
    VERFÜGBARE ARCHIVBEREICHE
  </div>


  <section class="homeTileGrid">

    <button
      class="homeTile"
      id="openPrologButton"
      type="button"
    >

      <div class="homeTileIcon">
        001
      </div>

      <div class="homeTileTitle">
        PROLOG LESEN
      </div>

      <div class="homeTileText">
        Archivakte CD-B1-001 wurde vollständig
        entschlüsselt.
      </div>

    </button>


    <div class="homeTile lockedTile">

      <div class="homeTileIcon"></div>

      <div class="homeTileTitle">
        WEITERE KAPITEL
      </div>

      <div class="homeTileText">
        Noch keine weiteren Kapitel freigeschaltet.
      </div>

    </div>


    <div class="homeTile lockedTile">

      <div class="homeTileIcon"></div>

      <div class="homeTileTitle">
        MASKENARCHIV
      </div>

      <div class="homeTileText">
        Sicherheitsfreigabe nicht ausreichend.
      </div>

    </div>


    <div class="homeTile lockedTile">

      <div class="homeTileIcon"></div>

      <div class="homeTileTitle">
        WESENSDATENBANK
      </div>

      <div class="homeTileText">
        Sicherheitsfreigabe nicht ausreichend.
      </div>

    </div>

  </section>
`;

/* =========================
   PROLOG-INHALT
========================= */

const prologContent = `
  <div class="archiveLabel">
    CHRONIKEN DER DUNKELHEIT
  </div>

  <h1>
    ARCHIVAKTE 001
  </h1>

  <div class="archiveSubtitle">
    LIAM UND DIE MASKE — PROLOG
  </div>

  <div class="infoGrid">

    <div class="infoBox">
      <span class="infoLabel">
        ZUGRIFFSSTATUS
      </span>

      <span class="infoValue green">
        FREIGEGEBEN
      </span>
    </div>

    <div class="infoBox">
      <span class="infoLabel">
        SICHERHEITSSTUFE
      </span>

      <span class="infoValue">
        1
      </span>
    </div>

    <div class="infoBox">
      <span class="infoLabel">
        AKTENKENNUNG
      </span>

      <span class="infoValue">
        CDD-001
      </span>
    </div>

  </div>

  <div class="bookTitleArea">

    <div class="bookSeries">
      CHRONIKEN DER DUNKELHEIT
    </div>

    <div class="bookTitle">
      LIAM UND DIE MASKE
    </div>

    <div class="bookAuthor">
      GESCHRIEBEN VON THE_MASKED_MIND
    </div>

    <div class="bookVolume">
      BAND 1 — PROLOG
    </div>

  </div>

  <article class="storyText">

    <p>
      Alles fing an mit einem harmlosen Kauf einer
      „Halloween-Maske“. An einem kalten Herbstnachmittag
      schlenderte ein junger Mann, Mitte 30, durch die
      schmalen Gänge eines Kostümladens. Die Regale waren
      gefüllt mit Plastikzähnen, Kunstblut, Hexenhüten und
      billigen Gruselmasken, die ihn aus leeren Augen
      anstarrten.
    </p>

    <p class="storyEmphasis">
      Wir nennen ihn … Matthias.
    </p>

    <p>
      Er hatte nicht vor, lange zu bleiben. Seine Kinder hatten
      sich auf Halloween gefreut und wie jedes Jahr wollte
      er ihnen einen schönen Abend bereiten. Nichts
      Besonderes. Einfach ein wenig verkleiden, ein paar
      Süßigkeiten sammeln und gemeinsam Spaß haben.
    </p>

    <p>
      Doch was danach passierte, sollte für ihn ein
      unvergessliches Erlebnis werden.
    </p>

    <p>
      In einem Regal mit verschiedenen Masken stach ihm
      eine ganz besonders ins Auge. Es war die einzige,
      die von dieser Sorte noch „übrig“ war. Er nahm sie
      an sich.
    </p>

    <p>
      Irgendetwas ging von ihr aus. Ein … „komisches“
      Gefühl. Vertraut, aber doch irgendwie … erdrückend.
      Er dachte sich nichts dabei und nahm sie mit nach
      Hause.
    </p>

    <p>
      Zusammen mit ein paar Accessoires stellte er sich
      das Kostüm zusammen. Ein paar Kleidungsstücke,
      etwas Kunstblut und die Maske.
    </p>

    <p>
      Immer wieder wanderte sein Blick zu ihr. Sie lag
      regungslos auf dem Wohnungstisch. Und doch hatte
      Matthias das Gefühl, dass etwas von ihr ausging.
      Etwas, das er nicht erklären konnte.
    </p>

    <p>
      In den Tagen vor Halloween ertappte er sich immer
      häufiger dabei, wie er sie aufsetzte. Anfangs nur
      für Sekunden. Später stand er oft vor dem Spiegel
      und betrachtete sein Spiegelbild länger, als ihm
      lieb war.
    </p>

    <p>
      Es war, als würde die Maske ihm etwas geben. Ein
      Gefühl von Stärke. Von Kontrolle.
    </p>

    <p>
      Wenn er sie trug, verschwanden all seine Sorgen.
      Die Probleme des Alltags rückten in weite Ferne.
      Zweifel lösten sich auf wie Nebel im Morgenlicht.
      Für diese kurzen Momente fühlte er sich unbesiegbar.
    </p>

    <p>
      Obwohl es ihm seltsam vorkam, konnte er nicht
      aufhören. Es war wie ein „Zwang“.
    </p>

    <p>
      Dann kam Halloween.
    </p>

    <p>
      Gemeinsam mit seinen Kindern zog er durch die
      Straßen. Überall leuchteten Kürbisse in den
      Vorgärten. Kinder rannten lachend über die Gehwege.
      Aus den Häusern drangen Stimmen, Musik und Gelächter.
    </p>

    <p>
      Matthias erschreckte Passanten, sammelte
      Süßigkeiten mit seinen Kindern und genoss den Abend.
      Für einen Moment schien alles normal. Fast so, als
      wäre die Maske tatsächlich nur eine gewöhnliche
      Halloween-Maske.
    </p>

    <p class="storySingleWord">
      Fast.
    </p>

    <p>
      Halloween war vorbei. Die Dekoration verschwand
      wieder in Kisten und Schränken. Auch Matthias
      begann, die Sachen für das nächste Jahr
      wegzuräumen.
    </p>

    <p>
      Mit einem leichten Lächeln hob er die Maske auf.
    </p>

    <p class="storyThought">
      „Das war lustig“, dachte er sich.
    </p>

    <p>
      Er wollte sie gerade in einen Karton legen.
    </p>

    <p>
      Da hörte er es.
    </p>

    <p class="maskVoice">
      „Setz mich auf.“
    </p>

    <p>
      Matthias erstarrte. Die Stimme war leise gewesen.
      Kaum mehr als ein Flüstern.
    </p>

    <p>
      Er blickte sich um. Niemand. Nur die Stille seines
      Wohnzimmers.
    </p>

    <p>
      Verunsichert sah er die Maske an.
    </p>

    <p class="storyThought">
      „Kann eine Maske reden? Unsinn“, dachte Matthias.
    </p>

    <p>
      Bestimmt war er nur müde gewesen. Er wollte sie
      erneut weglegen.
    </p>

    <p>
      Dann erklang die Stimme wieder. Diesmal deutlicher.
    </p>

    <p class="maskVoice">
      „Setz mich auf.“
    </p>

    <p>
      Ein kalter Schauer lief ihm über den Rücken.
      Irgendetwas in ihm sagte ihm, dass er die Maske
      sofort wegwerfen sollte.
    </p>

    <p>
      Doch er konnte nicht anders.
    </p>

    <p>
      Langsam hob er die Maske an. Wie ferngesteuert
      setzte er sie auf.
    </p>

    <p>
      Im selben Augenblick explodierte die Welt um ihn
      herum.
    </p>

    <p>
      Eine gewaltige Kraft durchfuhr seinen Körper.
      Schmerz schoss durch jede Faser seines Körpers.
      Vor seinen Augen flackerten Bilder auf.
    </p>

    <p class="visionText">
      Brennende Städte.<br>
      Schreiende Menschen.<br>
      Verzweiflung und Wut.
    </p>

    <p>
      Nicht seine eigene.
    </p>

    <p>
      Die Wut eines anderen.
    </p>

    <p>
      Mit letzter Kraft riss Matthias die Maske von
      seinem Gesicht. Schweiß lief ihm über die Stirn.
      Sein Herz raste.
    </p>

    <p>
      Die Welt um ihn herum fühlte sich fremd an.
      Verwirrt blickte er sich um. Seine Gedanken waren
      ein einziges Chaos.
    </p>

    <p>
      Dann wanderte sein Blick erneut zur Maske.
    </p>

    <p>
      Und etwas in ihm zerbrach.
    </p>

    <p>
      Widerwillig hob er sie wieder zu seinem Gesicht.
    </p>

    <p>
      Diesmal war es anders.
    </p>

    <p>
      Keine Bilder.
    </p>

    <p>
      Nur Schmerz.
    </p>

    <p>
      Sein Körper verkrampfte sich. Seine Muskeln zuckten
      unkontrolliert. Ein Schrei wollte seine Kehle
      verlassen, doch kein Laut kam heraus.
    </p>

    <p>
      Etwas drang in ihn ein.
    </p>

    <p>
      Etwas Fremdes.
    </p>

    <p>
      Dann wurde alles still.
    </p>

    <p>
      Er stand regungslos da. Dann neigte er den Kopf
      gen Himmel.
    </p>

    <p class="slasherVoice">
      „Endlich.“
    </p>

    <p>
      Die Stimme war tief.
    </p>

    <p>
      Es war nicht seine Stimme.
    </p>

    <p class="slasherVoice">
      „Endlich frei.“
    </p>

    <p>
      Das war nicht mehr Matthias.
    </p>

    <p>
      Etwas anderes blickte nun durch seine Augen.
      Etwas, das lange geschlafen hatte. Etwas, das auf
      diesen Augenblick gewartet hatte.
    </p>

    <div class="slasherReveal">

      <div class="slasherName">
        SLASHER
      </div>

      <div class="slasherOrigin">
        GEBOREN AUS TRAUER<br>
        GENÄHRT VON GEWALT<br>
        GESCHMIEDET AUS VERZWEIFLUNG
      </div>

    </div>

    <p class="revengeIntro">
      Sein Ziel war nur eines:
    </p>

    <div class="revengeSequence">

      <div class="revengeMain">
        RACHE …
      </div>

      <div class="revengeLine">
        Die Menschheit soll erfahren …
      </div>

      <div class="revengeLine">
        wie es ist …
      </div>

      <div class="revengeLine">
        in Angst zu leben …
      </div>

      <div class="revengeLine">
        Tag für Tag …
      </div>

      <div class="revengeLine">
        bis sie daran …
      </div>

      <div class="revengeFinal">
        ZERBRICHT …
      </div>

    </div>

  </article>
`;

/* =========================
   GESPERRTE AKTE
========================= */

function createLockedContent(name) {
  return `
    <div class="lockedScreen">

      <div class="lockedPanel">

        <div class="lockedIcon">
          🔒
        </div>

        <div class="lockedTitle">
          ZUGRIFF VERWEIGERT
        </div>

        <div class="lockedText">

          ${name}

          <br><br>

          SICHERHEITSFREIGABE
          NICHT AUSREICHEND.

          <br>

          DIESE ARCHIVAKTE WURDE
          NOCH NICHT ENTSCHLÜSSELT.

        </div>

      </div>

    </div>
  `;
}


/* =========================
   AKTIVEN BUTTON MARKIEREN
========================= */

function setActiveButton(selectedButton) {
  menuButtons.forEach(button => {
    button.classList.remove("active");
  });

  selectedButton.classList.add("active");
}

/* =========================
   SEITEN ÖFFNEN
========================= */

function clearActiveButtons() {
  menuButtons.forEach(button => {
    button.classList.remove("active");
  });
}


function showProlog() {
  contentArea.innerHTML =
    prologContent;

  clearActiveButtons();

  const prologButton =
    document.querySelector(
      "[data-page='prolog']"
    );

  if (prologButton) {
    prologButton.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function showHome() {
  contentArea.innerHTML =
    homeContent;

  clearActiveButtons();

  const openPrologButton =
    document.getElementById(
      "openPrologButton"
    );

  if (openPrologButton) {
    openPrologButton.addEventListener(
      "click",
      showProlog
    );
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================
   MENÜKLICKS
========================= */

menuButtons.forEach(button => {
  button.addEventListener("click", () => {
    setActiveButton(button);

    const isUnlocked =
      button.classList.contains("unlocked");

    const page =
      button.dataset.page;

    if (
      isUnlocked &&
      page === "prolog"
    ) {
      contentArea.innerHTML =
        prologContent;

      return;
    }

    const fileName =
      button.textContent.trim();

    contentArea.innerHTML =
      createLockedContent(fileName);
  });
});

/* =========================
   HOME-BUTTON
========================= */

const homeButton =
  document.getElementById("homeButton");

if (homeButton) {
  homeButton.addEventListener(
    "click",
    showHome
  );
}


/*
  Beim ersten Öffnen der Webseite
  wird immer die Home-Seite angezeigt.
*/

showHome();
