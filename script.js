/* =========================================================
   M.I.N.D. ARCHIV – ZENTRALE STEUERUNG
========================================================= */


/* =========================
   ELEMENTE DER WEBSEITE
========================= */

const bootScreen =
  document.getElementById("bootScreen");

const bootStatus =
  document.getElementById("bootStatus");

const contentArea =
  document.getElementById("contentArea");

const homeButton =
  document.getElementById("homeButton");

const menuButtons =
  [...document.querySelectorAll(".menuButton")];


/* =========================
   ZUORDNUNG DER ARCHIVSEITEN
========================= */

/*
  unlocked: true
  bedeutet: Die Datei darf geöffnet werden.

  file:
  Name der Datei im Ordner "data".
*/

const archivePages = {
  prolog: {
    file: "prolog.html",
    unlocked: true
  },

  kapitel1episode1: {
    file: "episode1.html",
    unlocked: true
  },

  kapitel1episode2: {
    file: "episode2.html",
    unlocked: false
  },

  kapitel1episode3: {
    file: "episode3.html",
    unlocked: false
  },

  kapitel1episode4: {
    file: "episode4.html",
    unlocked: false
  },

  kapitel2: {
    file: "kapitel2.html",
    unlocked: false
  },

  askarion: {
    file: "askarion.html",
    unlocked: false
  },

  nerathul: {
    file: "nerathul.html",
    unlocked: false
  },

  tharnex: {
    file: "tharnex.html",
    unlocked: false
  },

  dravion: {
    file: "dravion.html",
    unlocked: false
  },

  condor: {
    file: "condor.html",
    unlocked: false
  }
};


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
    text: "ARCHIVZENTRALE WIRD GELADEN..."
  }
];

function startBootSequence() {
  bootSteps.forEach(step => {
    setTimeout(() => {
      if (bootStatus) {
        bootStatus.textContent =
          step.text;
      }
    }, step.time);
  });

  setTimeout(async () => {
    await showHome();

    if (bootScreen) {
      bootScreen.classList.add("hidden");
    }
  }, 9000);
}


/* =========================
   AKTIVE MENÜMARKIERUNG
========================= */

function clearActiveButtons() {
  menuButtons.forEach(button => {
    button.classList.remove("active");
  });
}

function activateMenuButton(pageName) {
  clearActiveButtons();

  const selectedButton =
    document.querySelector(
      `[data-page="${pageName}"]`
    );

  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}


/* =========================
   HTML-DATEI LADEN
========================= */

async function loadPage(fileName) {
  try {
    /*
      Date.now() verhindert, dass der Browser
      eine alte Version der Datei aus dem Cache lädt.
    */

    const response = await fetch(
      `data/${fileName}?v=${Date.now()}`
    );

    if (!response.ok) {
      throw new Error(
        `Datei konnte nicht geladen werden: ${fileName}`
      );
    }

    const html =
      await response.text();

    contentArea.innerHTML =
      html;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return true;

  } catch (error) {
    console.error(
      "M.I.N.D.-Archivfehler:",
      error
    );

    contentArea.innerHTML = `
      <div class="lockedScreen">

        <div class="lockedPanel">

          <div class="lockedIcon">
            ⚠
          </div>

          <div class="lockedTitle">
            DATEIFEHLER
          </div>

          <div class="lockedText">
            DIE ARCHIVDATEI
            ${fileName}
            KONNTE NICHT GELADEN WERDEN.
            <br><br>
            PRÜFE DEN DATEINAMEN UND DEN ORDNER DATA.
          </div>

        </div>

      </div>
    `;

    return false;
  }
}


/* =========================
   HOME-SEITE
========================= */

async function showHome() {
  clearActiveButtons();

  const loaded =
    await loadPage("home.html");

  if (!loaded) {
    return;
  }

  /*
    Dieser Knopf befindet sich innerhalb
    von data/home.html.
  */

  const openPrologButton =
    document.getElementById(
      "openPrologButton"
    );

  if (openPrologButton) {
    openPrologButton.addEventListener(
      "click",
      () => openArchivePage("prolog")
    );
  }

  /*
    Optionaler Knopf für Episode 1.
    Er funktioniert, sobald er in home.html existiert.
  */

  const openEpisode1Button =
    document.getElementById(
      "openEpisode1Button"
    );

  if (openEpisode1Button) {
    openEpisode1Button.addEventListener(
      "click",
      () =>
        openArchivePage(
          "kapitel1episode1"
        )
    );
  }
}


/* =========================
   ARCHIVAKTE ÖFFNEN
========================= */

async function openArchivePage(pageName) {
  const page =
    archivePages[pageName];

  if (!page) {
    showLockedContent(
      "UNBEKANNTE ARCHIVAKTE"
    );

    return;
  }

  if (!page.unlocked) {
    const button =
      document.querySelector(
        `[data-page="${pageName}"]`
      );

    const title =
      button
        ? button.textContent.trim()
        : pageName;

    activateMenuButton(pageName);
    showLockedContent(title);

    return;
  }

  activateMenuButton(pageName);

  await loadPage(page.file);
}


/* =========================
   GESPERRTE ARCHIVAKTE
========================= */

function showLockedContent(name) {
  contentArea.innerHTML = `
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
          <br><br>

          DIESE ARCHIVAKTE WURDE
          NOCH NICHT ENTSCHLÜSSELT.
        </div>

      </div>

    </div>
  `;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   MENÜKLICKS
========================= */

menuButtons.forEach(button => {
  button.addEventListener(
    "click",
    () => {
      const pageName =
        button.dataset.page;

      openArchivePage(pageName);
    }
  );
});


/* =========================
   HOME-BUTTON
========================= */

if (homeButton) {
  homeButton.addEventListener(
    "click",
    showHome
  );
}


/* =========================
   SYSTEM STARTEN
========================= */

startBootSequence();
