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

  const bootIdentity =
    document.getElementById("bootIdentity");

  const bootUserName =
    document.getElementById("bootUserName");

  const bootAccessRank =
    document.getElementById("bootAccessRank");

  const bootWelcome =
    document.getElementById("bootWelcome");

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

  "TMM-OMEGA-7K4P": {
    name: "THE_MASKED_MIND",
    level: 100,
    rank: "OMEGA",
    title: "Schöpfer des Archivs",
    motto: "Der Schöpfer schreibt nicht die Wahrheit. Er erschafft den Ort, an dem sie bewahrt wird."
  },

  "SCHNIN-ALPHA-9Q2M": {
    name: "SCHNIN",
    level: 99,
    rank: "ALPHA",
    title: "Hüterin des Archivs",
    motto: "Das Archiv zu schützen bedeutet, die Wahrheit zu bewahren."
  },

  "TEST-DELTA-1": {
    name: "TESTZUSCHAUER",
    level: 1,
    rank: "DELTA",
    title: "Neugieriger Aktenleser",
    motto: "Jede Wahrheit beginnt mit der Neugier, eine Akte zu öffnen."
  },

  "TEST-GAMMA-10": {
    name: "TESTZUSCHAUER GAMMA",
    level: 10,
    rank: "GAMMA",
    title: "Bewahrer der Chroniken",
    motto: "Erinnerungen vergehen. Die Chroniken vergessen niemals."
  },

  "TEST-BETA-20": {
    name: "TESTZUSCHAUER BETA",
    level: 20,
    rank: "BETA",
    title: "Forscher der Unterwelt",
    motto: "Wer in die Dunkelheit blickt, muss lernen, ihr zu widerstehen."
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
        currentUser.rank === "OMEGA"
      ) {
        archiveAccessRank.classList.add(
          "accessOmega"
        );
      }
       
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

function updateBootIdentity() {
  if (bootUserName) {
    bootUserName.textContent =
      currentUser.name;
  }

  if (bootAccessRank) {
    bootAccessRank.textContent =
      currentUser.rank;

    bootAccessRank.className =
      "bootIdentityValue";

    const rankClass =
      currentUser.rank.toLowerCase();

    if (
      rankClass === "omega" ||
      rankClass === "alpha" ||
      rankClass === "beta" ||
      rankClass === "gamma" ||
      rankClass === "delta"
    ) {
      bootAccessRank.classList.add(
        rankClass
      );
    } else {
      bootAccessRank.classList.add(
        "none"
      );
    }
  }
}


function startBootSequence() {

  setTimeout(() => {
    if (bootStatus) {
      bootStatus.textContent =
        "IDENTITÄT WIRD GEPRÜFT...";
    }
  }, 1000);


  setTimeout(() => {
    updateBootIdentity();

    if (bootIdentity) {
      bootIdentity.classList.add("show");
    }

    if (bootStatus) {
      bootStatus.textContent =
        "IDENTITÄT BESTÄTIGT";
    }
  }, 3000);


  setTimeout(() => {
    if (bootWelcome) {
      if (currentUser.level > 0) {
        bootWelcome.textContent =
          `WILLKOMMEN ZURÜCK, ${currentUser.name}`;
      } else {
        bootWelcome.textContent =
          "WILLKOMMEN IM M.I.N.D. ARCHIV";
      }

      bootWelcome.classList.add("show");
    }

    if (bootStatus) {
      bootStatus.textContent =
        "SICHERHEITSFREIGABE AKZEPTIERT";
    }
  }, 7000);


  setTimeout(() => {
    if (bootStatus) {
      bootStatus.textContent =
        "ARCHIVZENTRALE WIRD GELADEN...";
    }
  }, 11000);


  setTimeout(async () => {
    await showHome();

    if (bootScreen) {
      bootScreen.classList.add(
        "hidden"
      );
    }
  }, 15000);
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
  const levelElements =
    document.querySelectorAll(
      "[data-current-level]"
    );

  const titleElements =
    document.querySelectorAll(
      "[data-current-title]"
    );

  const mottoElements =
    document.querySelectorAll(
      "[data-current-motto]"
    );
  const userElements =
    document.querySelectorAll(
      "[data-current-user]"
    );

  const rankElements =
    document.querySelectorAll(
      "[data-current-rank]"
    );

  const accessDescriptions =
    document.querySelectorAll(
      "[data-access-description]"
    );

  const unlockedCountElements =
    document.querySelectorAll(
      "[data-unlocked-count]"
    );

  const lockedCountElements =
    document.querySelectorAll(
      "[data-locked-count]"
    );

userElements.forEach(element => {
  element.textContent =
    currentUser.level > 0
      ? currentUser.name
      : "UNBEKANNTER BESUCHER";
});

rankElements.forEach(element => {
  element.textContent =
    currentUser.rank;
});

levelElements.forEach(element => {
  element.textContent =
    currentUser.level;
});

titleElements.forEach(element => {
  element.textContent =
    currentUser.title ||
    "Unbekannter Besucher";
});

mottoElements.forEach(element => {
  const motto =
    currentUser.motto ||
    "Das Archiv beobachtet jeden, der seine Hallen betritt.";

  element.textContent =
    `„${motto}“`;
});


  let accessDescription =
    "KEINE ARCHIVFREIGABE";

  if (currentUser.rank === "DELTA") {
    accessDescription =
      "NEUGIERIGER AKTENLESER";
  }

  if (currentUser.rank === "GAMMA") {
    accessDescription =
      "BEWAHRER DER CHRONIKEN";
  }

  if (currentUser.rank === "BETA") {
    accessDescription =
      "FORSCHER DER UNTERWELT";
  }

  if (currentUser.rank === "ALPHA") {
    accessDescription =
      "HÜTER DES ARCHIVS";
  }

  if (currentUser.rank === "OMEGA") {
    accessDescription =
      "SCHÖPFER DES ARCHIVS";
  }


  accessDescriptions.forEach(element => {
    element.textContent =
      accessDescription;
  });


  let unlockedCount = 0;
  let lockedCount = 0;

  menuButtons.forEach(button => {
    const requiredLevel =
      Number(button.dataset.level || 0);

    if (
      currentUser.level >= requiredLevel
    ) {
      unlockedCount++;
    } else {
      lockedCount++;
    }
  });


  unlockedCountElements.forEach(element => {
    element.textContent =
      unlockedCount;
  });


  lockedCountElements.forEach(element => {
    element.textContent =
      lockedCount;
  });
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
    if (level >= 100) {
      return "OMEGA";
    }
     
     if (level >= 99) {
      return "ALPHA";
    }

    if (level >= 20) {
      return "BETA";
    }

    if (level >= 10) {
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
