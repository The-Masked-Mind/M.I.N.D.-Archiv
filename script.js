/* =========================================================
   M.I.N.D. ARCHIV – ZENTRALE STEUERUNG
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTE
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
          bootStatus.textContent = step.text;
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
     MENÜMARKIERUNG
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
     DATEIPFAD ERSTELLEN
  ========================= */

  function createFilePath(pageName) {
    /*
      Beispiel:

      data-page=
      "kapitel/kapitel_1/kapitel_1_episode_1"

      wird zu:

      data/kapitel/kapitel_1/
      kapitel_1_episode_1.html
    */

    if (!pageName) {
      return null;
    }

    if (pageName.endsWith(".html")) {
      return `data/${pageName}`;
    }

    return `data/${pageName}.html`;
  }


  /* =========================
     HTML-DATEI LADEN
  ========================= */

  async function loadPage(filePath) {
    if (!contentArea || !filePath) {
      return false;
    }

    try {
      /*
        Date.now() verhindert,
        dass eine alte Version aus
        dem Browser-Cache geladen wird.
      */

      const response = await fetch(
        `${filePath}?v=${Date.now()}`
      );

      if (!response.ok) {
        throw new Error(
          `Datei nicht gefunden: ${filePath}`
        );
      }

      const html =
        await response.text();

      contentArea.innerHTML = html;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      connectPageButtons();

      return true;

    } catch (error) {
      console.error(
        "M.I.N.D.-Archivfehler:",
        error
      );

      showFileError(filePath);

      return false;
    }
  }


  /* =========================
     HOME-SEITE
  ========================= */

  async function showHome() {
    clearActiveButtons();

    await loadPage("data/home.html");
  }


  /* =========================
     ARCHIVAKTE ÖFFNEN
  ========================= */

  async function openArchivePage(
    pageName,
    sourceButton = null
  ) {
    if (!pageName) {
      return;
    }

    /*
      Gesperrter Menüpunkt
    */

    if (
      sourceButton &&
      sourceButton.classList.contains("locked")
    ) {
      activateMenuButton(pageName);

      showLockedContent(
        sourceButton.textContent.trim()
      );

      return;
    }

    /*
      Freigeschaltete Datei
    */

    activateMenuButton(pageName);

    const filePath =
      createFilePath(pageName);

    await loadPage(filePath);
  }


  /* =========================
     KNÖPFE INNERHALB DER
     GELADENEN SEITEN
  ========================= */

  function connectPageButtons() {
    /*
      Vorhandener Prolog-Knopf
      aus home.html
    */

    const openPrologButton =
      document.getElementById(
        "openPrologButton"
      );

    if (openPrologButton) {
      openPrologButton.addEventListener(
        "click",
        () => {
          openArchivePage("prolog");
        }
      );
    }

    /*
      Vorhandener Episode-1-Knopf
      aus home.html
    */

    const openEpisode1Button =
      document.getElementById(
        "openEpisode1Button"
      );

    if (openEpisode1Button) {
      openEpisode1Button.addEventListener(
        "click",
        () => {
          openArchivePage(
            "kapitel/kapitel_1/kapitel_1_episode_1"
          );
        }
      );
    }

    /*
      Flexible Knöpfe für später.

      Beispiel in einer HTML-Datei:

      <button
        data-open-page=
        "masken_des_unheils/askarion"
      >
        Askarion öffnen
      </button>
    */

    const pageLinks =
      document.querySelectorAll(
        "[data-open-page]"
      );

    pageLinks.forEach(button => {
      button.addEventListener(
        "click",
        () => {
          const pageName =
            button.dataset.openPage;

          openArchivePage(pageName);
        }
      );
    });
  }


  /* =========================
     GESPERRTE AKTE
  ========================= */

  function showLockedContent(name) {
    if (!contentArea) {
      return;
    }

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
     DATEIFEHLER
  ========================= */

  function showFileError(filePath) {
    if (!contentArea) {
      return;
    }

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
            DIE ARCHIVDATEI KONNTE
            NICHT GELADEN WERDEN.

            <br><br>

            ${filePath}

            <br><br>

            PRÜFE DEN DATEINAMEN,
            DIE ENDUNG .HTML UND
            DEN ORDNERPFAD.
          </div>

        </div>

      </div>
    `;
  }


  /* =========================
     LINKES MENÜ
  ========================= */

  menuButtons.forEach(button => {
    button.addEventListener(
      "click",
      () => {
        const pageName =
          button.dataset.page;

        openArchivePage(
          pageName,
          button
        );
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

});
