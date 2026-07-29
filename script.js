/* =========================================================
   M.I.N.D. ARCHIV – ZENTRALE STEUERUNG
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     GRUNDELEMENTE
  ========================= */

  const bootScreen =
    document.getElementById("bootScreen");

  const bootStatus =
    document.getElementById("bootStatus");

  const contentArea =
    document.getElementById("contentArea");

  const homeButton =
    document.getElementById("homeButton");

  const archiveUserName =
    document.getElementById("archiveUserName");

  const archiveAccessRank =
    document.getElementById("archiveAccessRank");

  const menuButtons =
    [...document.querySelectorAll(".menuButton")];


  /* =========================
     ZUGANGSCODES
  ========================= */

  /*
    Diese Codes kannst du später ändern.

    Link für dich:

    ?code=MTM-ALPHA-7K4P

    Link für Schnin:

    ?code=SCHNIN-ALPHA-9Q2M
  */

  const accessCodes = {

    "MTM-ALPHA-7K4P": {
      name: "THE_MASKED_MIND",
      level: 999,
      rank: "ALPHA"
    },

    "SCHNIN-ALPHA-9Q2M": {
      name: "SCHNIN",
      level: 999,
      rank: "ALPHA"
    },

    /*
      Beispiel für einen Zuschauer,
      der nur den Prolog besitzt.
    */

    "TEST-STUFE-1": {
      name: "TESTZUSCHAUER",
      level: 1,
      rank: "DELTA"
    },

    /*
      Beispiel für Prolog + Episode 1.
    */

    "TEST-STUFE-2": {
      name: "TESTZUSCHAUER 2",
      level: 2,
      rank: "GAMMA"
    }

  };


  /* =========================
     STANDARDPROFIL
  ========================= */

  let currentUser = {
    name: "GAST",
    level: 0,
    rank: "KEINE"
  };


  /* =========================
     CODE AUS LINK LESEN
  ========================= */

  function loadAccessCode() {
    const parameters =
      new URLSearchParams(
        window.location.search
      );

    const code =
      parameters.get("code");

    if (
      code &&
      accessCodes[code]
    ) {
      currentUser =
        accessCodes[code];
    }

    updateUserTerminal();
    updateMenuAccess();
  }


  /* =========================
     BENUTZERANZEIGE
  ========================= */

  function updateUserTerminal() {
    if (archiveUserName) {
      archiveUserName.textContent =
        currentUser.name;
    }

    if (archiveAccessRank) {
      archiveAccessRank.textContent =
        currentUser.rank;

      archiveAccessRank.className =
        "userTerminalValue";

      if (
        currentUser.rank === "ALPHA"
      ) {
        archiveAccessRank.classList.add(
          "accessAlpha"
        );
      }

      if (
        currentUser.rank === "BETA"
      ) {
        archiveAccessRank.classList.add(
          "accessBeta"
        );
      }

      if (
        currentUser.rank === "GAMMA"
      ) {
        archiveAccessRank.classList.add(
          "accessGamma"
        );
      }

      if (
        currentUser.rank === "DELTA"
      ) {
        archiveAccessRank.classList.add(
          "accessDelta"
        );
      }
    }
  }


  /* =========================
     MENÜSPERREN AKTUALISIEREN
  ========================= */

  function updateMenuAccess() {
    menuButtons.forEach(button => {
      const requiredLevel =
        Number(
          button.dataset.level || 0
        );

      const hasAccess =
        currentUser.level >= requiredLevel;

      button.classList.toggle(
        "unlocked",
        hasAccess
      );

      button.classList.toggle(
        "locked",
        !hasAccess
      );
    });
  }


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
        bootScreen.classList.add(
          "hidden"
        );
      }
    }, 9000);
  }


  /* =========================
     AKTIVE MENÜMARKIERUNG
  ========================= */

  function clearActiveButtons() {
    menuButtons.forEach(button => {
      button.classList.remove(
        "active"
      );
    });
  }

  function activateMenuButton(pageName) {
    clearActiveButtons();

    const selectedButton =
      document.querySelector(
        `[data-page="${pageName}"]`
      );

    if (selectedButton) {
      selectedButton.classList.add(
        "active"
      );
    }
  }


  /* =========================
     DATEIPFAD ERZEUGEN
  ========================= */

  function createFilePath(pageName) {
    if (!pageName) {
      return null;
    }

    if (
      pageName.endsWith(".html")
    ) {
      return `data/${pageName}`;
    }

    return `data/${pageName}.html`;
  }


  /* =========================
     HTML-DATEI LADEN
  ========================= */

  async function loadPage(filePath) {
    if (
      !contentArea ||
      !filePath
    ) {
      return false;
    }

    try {
      const response =
        await fetch(
          `${filePath}?v=${Date.now()}`
        );

      if (!response.ok) {
        throw new Error(
          `Datei nicht gefunden: ${filePath}`
        );
      }

      const html =
        await response.text();

      contentArea.innerHTML =
        html;

      connectPageButtons();
      updateDynamicPageInformation();

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

      showFileError(filePath);

      return false;
    }
  }


  /* =========================
     INFORMATIONEN INNERHALB
     EINER AKTE AKTUALISIEREN
  ========================= */

  function updateDynamicPageInformation() {
    const pageUserName =
      document.querySelector(
        "[data-current-user]"
      );

    const pageAccessRank =
      document.querySelector(
        "[data-current-rank]"
      );

    if (pageUserName) {
      pageUserName.textContent =
        currentUser.name;
    }

    if (pageAccessRank) {
      pageAccessRank.textContent =
        currentUser.rank;
    }
  }


  /* =========================
     HOME
  ========================= */

  async function showHome() {
    clearActiveButtons();

    await loadPage(
      "data/home.html"
    );
  }


  /* =========================
     AKTE ÖFFNEN
  ========================= */

  async function openArchivePage(
    pageName,
    sourceButton = null
  ) {
    if (!pageName) {
      return;
    }

    let requiredLevel = 0;

    if (sourceButton) {
      requiredLevel =
        Number(
          sourceButton.dataset.level || 0
        );
    }

    if (
      currentUser.level <
      requiredLevel
    ) {
      activateMenuButton(pageName);

      showLockedContent(
        sourceButton
          ? sourceButton.textContent.trim()
          : pageName,
        requiredLevel
      );

      return;
    }

    activateMenuButton(pageName);

    const filePath =
      createFilePath(pageName);

    await loadPage(filePath);
  }


  /* =========================
     GESPERRTE AKTE
  ========================= */

  function showLockedContent(
    name,
    requiredLevel
  ) {
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

            AKTUELLE FREIGABE:
            ${currentUser.rank}

            <br><br>

            BENÖTIGTE
            SICHERHEITSSTUFE:
            ${getRankName(requiredLevel)}

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
     STUFENNAME ERMITTELN
  ========================= */

  function getRankName(level) {
    if (level >= 999) {
      return "ALPHA";
    }

    if (level >= 4) {
      return "BETA";
    }

    if (level >= 2) {
      return "GAMMA";
    }

    if (level >= 1) {
      return "DELTA";
    }

    return "KEINE";
  }


  /* =========================
     DATEIFEHLER
  ========================= */

  function showFileError(filePath) {
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
     KNÖPFE IN GELADENEN SEITEN
  ========================= */

  function connectPageButtons() {
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

          const requiredLevel =
            Number(
              button.dataset.level || 0
            );

          if (
            currentUser.level <
            requiredLevel
          ) {
            showLockedContent(
              button.textContent.trim(),
              requiredLevel
            );

            return;
          }

          openArchivePage(
            pageName
          );
        }
      );
    });
  }


  /* =========================
     LINKES MENÜ
  ========================= */

  menuButtons.forEach(button => {
    button.addEventListener(
      "click",
      () => {
        openArchivePage(
          button.dataset.page,
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

  loadAccessCode();
  startBootSequence();

});
