/* =========================================================
   M.I.N.D. ARCHIV – ZENTRALE STEUERUNG
========================================================= */
const SUPABASE_URL =
  "https://vyyysbwtzisvgigrkgkv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ubqmffcDeAtVfr__G1k0Fg_WGsXCcMK";

  async function loadMindUserFromSupabase() {
  const parameters = new URLSearchParams(window.location.search);
  const accessCode = parameters.get("code");

  if (!accessCode) {
    console.warn("M.I.N.D.: Kein Zugangscode in der URL.");
    return null;
  }

  const requestUrl =
    `${SUPABASE_URL}/rest/v1/mind_users` +
    `?access_code=eq.${encodeURIComponent(accessCode)}` +
    `&select=twitch_name,level,access_code`;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "M.I.N.D.: Supabase-Abfrage fehlgeschlagen:",
        response.status,
        errorText
      );

      return null;
    }

    const users = await response.json();

    if (!Array.isArray(users) || users.length === 0) {
      console.warn(
        "M.I.N.D.: Kein Benutzer für diesen Code gefunden."
      );

      return null;
    }

    return users[0];
  } catch (error) {
    console.error(
      "M.I.N.D.: Verbindung zu Supabase fehlgeschlagen:",
      error
    );

    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  
  const mindUser = await loadMindUserFromSupabase();

  if (mindUser) {
    const userName =
      mindUser.twitch_name || "UNBEKANNTER NUTZER";

    const userLevel =
      Number.parseInt(mindUser.level, 10) || 1;

    localStorage.setItem("mindUserName", userName);
    localStorage.setItem("mindUserLevel", String(userLevel));
  }
  
  /* =======================================================
     GRUNDELEMENTE
  ======================================================= */

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


  /* =======================================================
     ZUGANGSCODES
  ======================================================= */

  const accessCodes = {

    "TMM-OMEGA-7K4P": {
      name: "THE_MASKED_MIND",
      level: 100,
      title: "Schöpfer des Archivs",
      motto:
        "Der Schöpfer schreibt nicht die Wahrheit. Er erschafft den Ort, an dem sie bewahrt wird."
    },

    "SCHNIN-ALPHA-9Q2M": {
      name: "SCHNIN",
      level: 99,
      title: "Hüterin des Archivs",
      motto:
        "Das Archiv zu schützen bedeutet, die Wahrheit zu bewahren."
    },

    "TEST-DELTA-1": {
      name: "TESTZUSCHAUER",
      level: 1
    },

    "TEST-DELTA-2": {
      name: "TESTZUSCHAUER LEVEL 2",
      level: 2
    },

    "TEST-GAMMA-10": {
      name: "TESTZUSCHAUER GAMMA",
      level: 10
    },

    "TEST-BETA-20": {
      name: "TESTZUSCHAUER BETA",
      level: 20
    }

  };


  /* =======================================================
     RANGDATEN
  ======================================================= */

  const rankInformation = {

    KEINE: {
      title: "Unbekannter Besucher",
      motto:
        "Das Archiv beobachtet jeden, der seine Hallen betritt."
    },

    DELTA: {
      title: "Neugieriger Aktenleser",
      motto:
        "Jede Wahrheit beginnt mit der Neugier, eine Akte zu öffnen."
    },

    GAMMA: {
      title: "Bewahrer der Chroniken",
      motto:
        "Erinnerungen vergehen. Die Chroniken vergessen niemals."
    },

    BETA: {
      title: "Forscher der Unterwelt",
      motto:
        "Wer in die Dunkelheit blickt, muss lernen, ihr zu widerstehen."
    },

    ALPHA: {
      title: "Hüter des Archivs",
      motto:
        "Das Archiv zu schützen bedeutet, die Wahrheit zu bewahren."
    },

    OMEGA: {
      title: "Schöpfer des Archivs",
      motto:
        "Der Schöpfer schreibt nicht die Wahrheit. Er erschafft den Ort, an dem sie bewahrt wird."
    }

  };


  /* =======================================================
     STANDARDPROFIL
  ======================================================= */

  let currentUser = createUserProfile({
    name: "GAST",
    level: 0
  });


  /* =======================================================
     RANG AUS LEVEL BERECHNEN
  ======================================================= */

  function getRankName(level) {
    if (level >= 100) {
      return "OMEGA";
    }

    if (level >= 50) {
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


  /* =======================================================
     BENUTZERPROFIL ERSTELLEN
  ======================================================= */

  function createUserProfile(userData) {
    const level =
      Number(userData.level || 0);

    const rank =
      getRankName(level);

    const defaultRankData =
      rankInformation[rank];

    return {
      name:
        userData.name || "GAST",

      level,

      rank,

      title:
        userData.title ||
        defaultRankData.title,

      motto:
        userData.motto ||
        defaultRankData.motto
    };
  }


  /* =======================================================
     ZUGANGSCODE AUS URL LADEN
  ======================================================= */

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
        createUserProfile(
          accessCodes[code]
        );
    }

    updateUserTerminal();
    updateMenuAccess();
  }


  /* =======================================================
     BENUTZERANZEIGE OBEN RECHTS
  ======================================================= */

  function updateUserTerminal() {
    if (archiveUserName) {
      archiveUserName.textContent =
        currentUser.level > 0
          ? currentUser.name
          : "GAST";
    }

    if (!archiveAccessRank) {
      return;
    }

    archiveAccessRank.textContent =
      currentUser.rank;

    archiveAccessRank.className =
      "userTerminalValue";

    const rankClass =
      `access${capitalizeWord(
        currentUser.rank.toLowerCase()
      )}`;

    archiveAccessRank.classList.add(
      rankClass
    );
  }


  /* =======================================================
     MENÜZUGRIFF AKTUALISIEREN
  ======================================================= */

  function updateMenuAccess() {
    menuButtons.forEach(button => {
      const requiredLevel =
        getRequiredLevel(button);

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


  /* =======================================================
     STARTSEQUENZ
  ======================================================= */

  function updateBootIdentity() {
    if (bootUserName) {
      bootUserName.textContent =
        currentUser.level > 0
          ? currentUser.name
          : "UNBEKANNTER BESUCHER";
    }

    if (!bootAccessRank) {
      return;
    }

    bootAccessRank.textContent =
      `${currentUser.rank} – LEVEL ${currentUser.level}`;

    bootAccessRank.className =
      "bootIdentityValue";

    const rankClass =
      currentUser.rank.toLowerCase();

    if (
      [
        "omega",
        "alpha",
        "beta",
        "gamma",
        "delta"
      ].includes(rankClass)
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


  function startBootSequence() {
    setTimeout(() => {
      setBootStatus(
        "IDENTITÄT WIRD GEPRÜFT..."
      );
    }, 1000);


    setTimeout(() => {
      updateBootIdentity();

      if (bootIdentity) {
        bootIdentity.classList.add(
          "show"
        );
      }

      setBootStatus(
        "IDENTITÄT BESTÄTIGT"
      );
    }, 3000);


    setTimeout(() => {
      if (bootWelcome) {
        bootWelcome.textContent =
          currentUser.level > 0
            ? `WILLKOMMEN ZURÜCK, ${currentUser.name}`
            : "WILLKOMMEN IM M.I.N.D. ARCHIV";

        bootWelcome.classList.add(
          "show"
        );
      }

      setBootStatus(
        "SICHERHEITSFREIGABE AKZEPTIERT"
      );
    }, 7000);


    setTimeout(() => {
      setBootStatus(
        "ARCHIVZENTRALE WIRD GELADEN..."
      );
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


  function setBootStatus(text) {
    if (bootStatus) {
      bootStatus.textContent = text;
    }
  }


  /* =======================================================
     MENÜMARKIERUNG
  ======================================================= */

  function clearActiveButtons() {
    menuButtons.forEach(button => {
      button.classList.remove(
        "active"
      );
    });
  }


  function activateMenuButton(pageName) {
    clearActiveButtons();

    const normalizedPage =
      normalizePageName(pageName);

    const selectedButton =
      menuButtons.find(button => {
        return normalizePageName(
          button.dataset.page
        ) === normalizedPage;
      });

    if (selectedButton) {
      selectedButton.classList.add(
        "active"
      );
    }
  }


  /* =======================================================
     DATEIPFADE
  ======================================================= */

  function normalizePageName(pageName) {
    if (!pageName) {
      return "";
    }

    return pageName
      .replace(/^data\//, "")
      .replace(/\.html$/, "");
  }


  function createFilePath(pageName) {
    const normalizedPage =
      normalizePageName(pageName);

    if (!normalizedPage) {
      return null;
    }

    return `data/${normalizedPage}.html`;
  }


  /* =======================================================
     HTML-DATEI LADEN
  ======================================================= */

  async function loadPage(filePath) {
    if (
      !contentArea ||
      !filePath
    ) {
      return false;
    }

    try {
      const separator =
        filePath.includes("?")
          ? "&"
          : "?";

      const response =
        await fetch(
          `${filePath}${separator}v=${Date.now()}`
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
      updatePageTileAccess();

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


  /* =======================================================
     DYNAMISCHE SEITENINFORMATIONEN
  ======================================================= */

  function updateDynamicPageInformation() {
    setTextForAll(
      "[data-current-user]",
      currentUser.level > 0
        ? currentUser.name
        : "UNBEKANNTER BESUCHER"
    );

    setTextForAll(
      "[data-current-rank]",
      currentUser.rank
    );

    setTextForAll(
      "[data-current-level]",
      currentUser.level
    );

    setTextForAll(
      "[data-current-title]",
      currentUser.title
    );

    setTextForAll(
      "[data-current-motto]",
      `„${currentUser.motto}“`
    );

    setTextForAll(
      "[data-access-description]",
      getAccessDescription()
    );

    updateArchiveCounts();
  }


  function setTextForAll(selector, value) {
    document
      .querySelectorAll(selector)
      .forEach(element => {
        element.textContent = value;
      });
  }


  function getAccessDescription() {
    switch (currentUser.rank) {
      case "OMEGA":
        return "SCHÖPFER DES ARCHIVS";

      case "ALPHA":
        return "HÜTER DES ARCHIVS";

      case "BETA":
        return "FORSCHER DER UNTERWELT";

      case "GAMMA":
        return "BEWAHRER DER CHRONIKEN";

      case "DELTA":
        return "NEUGIERIGER AKTENLESER";

      default:
        return "KEINE ARCHIVFREIGABE";
    }
  }


  function updateArchiveCounts() {
    let unlockedCount = 0;
    let lockedCount = 0;

    menuButtons.forEach(button => {
      const requiredLevel =
        getRequiredLevel(button);

      if (
        currentUser.level >= requiredLevel
      ) {
        unlockedCount++;
      } else {
        lockedCount++;
      }
    });

    setTextForAll(
      "[data-unlocked-count]",
      unlockedCount
    );

    setTextForAll(
      "[data-locked-count]",
      lockedCount
    );
  }


  /* =======================================================
     HOME-SEITE
  ======================================================= */

  async function showHome() {
    clearActiveButtons();

    await loadPage(
      "data/home.html"
    );
  }


  /* =======================================================
     AKTE ÖFFNEN
  ======================================================= */

  async function openArchivePage(
    pageName,
    sourceElement = null
  ) {
    const normalizedPage =
      normalizePageName(pageName);

    if (!normalizedPage) {
      return;
    }

    const matchingMenuButton =
      findMenuButton(normalizedPage);

    const requiredLevel =
      sourceElement?.dataset.level
        ? getRequiredLevel(sourceElement)
        : matchingMenuButton
          ? getRequiredLevel(
              matchingMenuButton
            )
          : 999;

    if (
      currentUser.level <
      requiredLevel
    ) {
      activateMenuButton(
        normalizedPage
      );

      showLockedContent(
        sourceElement?.textContent.trim() ||
        matchingMenuButton?.textContent.trim() ||
        normalizedPage,
        requiredLevel
      );

      return;
    }

    activateMenuButton(
      normalizedPage
    );

    const filePath =
      createFilePath(
        normalizedPage
      );

    await loadPage(filePath);
  }


  function findMenuButton(pageName) {
    const normalizedPage =
      normalizePageName(pageName);

    return menuButtons.find(button => {
      return normalizePageName(
        button.dataset.page
      ) === normalizedPage;
    });
  }


  function getRequiredLevel(element) {
    const level =
      Number(
        element?.dataset.level
      );

    return Number.isFinite(level)
      ? level
      : 999;
  }


  /* =======================================================
     GESPERRTE AKTE
  ======================================================= */

  function showLockedContent(
    name,
    requiredLevel
  ) {
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
            ${escapeHtml(name)}

            <br><br>

            AKTUELLER RANG:
            ${currentUser.rank}

            <br>

            AKTUELLES LEVEL:
            ${currentUser.level}

            <br><br>

            BENÖTIGTER RANG:
            ${getRankName(requiredLevel)}

            <br>

            BENÖTIGTES LEVEL:
            ${requiredLevel}

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


  /* =======================================================
     DATEIFEHLER
  ======================================================= */

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

            ${escapeHtml(filePath)}

            <br><br>

            PRÜFE DEN DATEINAMEN,
            DIE ENDUNG .HTML UND
            DEN ORDNERPFAD.
          </div>

        </div>

      </div>
    `;
  }


  /* =======================================================
     KNÖPFE INNERHALB GELADENER SEITEN
  ======================================================= */

  function connectPageButtons() {
    const pageLinks =
      document.querySelectorAll(
        "[data-open-page]"
      );

    pageLinks.forEach(button => {
      button.addEventListener(
        "click",
        () => {
          openArchivePage(
            button.dataset.openPage,
            button
          );
        }
      );
    });
  }


  function updatePageTileAccess() {
    const pageLinks =
      document.querySelectorAll(
        "[data-open-page]"
      );

    pageLinks.forEach(element => {
      const requiredLevel =
        getRequiredLevel(element);

      const hasAccess =
        currentUser.level >= requiredLevel;

      element.classList.toggle(
        "lockedTile",
        !hasAccess
      );

      element.classList.toggle(
        "unlockedTile",
        hasAccess
      );

      const statusElement =
        element.querySelector(
          ".archiveCategoryStatus, .maskOverviewStatus"
      );

      if (statusElement) {
        statusElement.textContent =
          hasAccess
            ? "ARCHIV ÖFFNEN"
            : "ZUGRIFF GESPERRT";
      }
    });
  }


  /* =======================================================
     LINKES MENÜ
  ======================================================= */

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


  /* =======================================================
     HOME-BUTTON
  ======================================================= */

  if (homeButton) {
    homeButton.addEventListener(
      "click",
      showHome
    );
  }


  /* =======================================================
     HILFSFUNKTIONEN
  ======================================================= */

  function capitalizeWord(word) {
    if (!word) {
      return "";
    }

    return (
      word.charAt(0).toUpperCase() +
      word.slice(1)
    );
  }


  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  /* =======================================================
     SYSTEM STARTEN
  ======================================================= */

  loadAccessCode();
  startBootSequence();

});