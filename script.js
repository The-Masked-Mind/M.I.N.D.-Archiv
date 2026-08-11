/* =========================================================
   M.I.N.D. ARCHIV – ZENTRALE STEUERUNG
========================================================= */

const SUPABASE_URL =
  "https://vyyysbwtzisvgigrkgkv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ubqmffcDeAtVfr__G1k0Fg_WGsXCcMK";


/* =========================================================
   SUPABASE-BENUTZER LADEN
========================================================= */

async function loadMindUserFromSupabase() {
  const parameters =
    new URLSearchParams(
      window.location.search
    );

  const accessCode =
    String(
      parameters.get("code") || ""
    ).trim();

  if (!accessCode) {
    console.warn(
      "M.I.N.D.: Kein Zugangscode in der URL."
    );

    return null;
  }

  const requestUrl =
    `${SUPABASE_URL}/rest/v1/mind_users` +
    `?access_code=eq.${encodeURIComponent(accessCode)}` +
    `&select=twitch_name,level,access_code`;

  try {
    const response =
      await fetch(requestUrl, {
        method: "GET",

        headers: {
          apikey:
            SUPABASE_PUBLISHABLE_KEY
        }
      });

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "M.I.N.D.: Supabase-Abfrage fehlgeschlagen:",
        response.status,
        errorText
      );

      return null;
    }

    const users =
      await response.json();

    if (
      !Array.isArray(users) ||
      users.length === 0
    ) {
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


/* =========================================================
   GLOBALER WARTUNGSMODUS
========================================================= */

async function loadMaintenanceStatus() {
  const requestUrl =
    `${SUPABASE_URL}/rest/v1/mind_settings` +
    `?setting_key=eq.maintenance_mode` +
    `&select=enabled,message` +
    `&limit=1`;

  try {
    const response =
      await fetch(requestUrl, {
        method: "GET",

        headers: {
          apikey:
            SUPABASE_PUBLISHABLE_KEY
        }
      });

    if (!response.ok) {
      console.error(
        "M.I.N.D.: Wartungsstatus konnte nicht geladen werden:",
        response.status,
        await response.text()
      );

      return {
        enabled: false,
        message: ""
      };
    }

    const settings =
      await response.json();

    const setting =
      Array.isArray(settings)
        ? settings[0]
        : null;

    return {
      enabled:
        setting?.enabled === true,

      message:
        String(
          setting?.message ||
          "Das Archiv ist aufgrund von Wartungsarbeiten vorübergehend nicht verfügbar."
        )
    };

  } catch (error) {
    console.error(
      "M.I.N.D.: Verbindung zur Wartungssteuerung fehlgeschlagen:",
      error
    );

    /* Bei einem Verbindungsfehler bleibt das Archiv erreichbar. */
    return {
      enabled: false,
      message: ""
    };
  }
}


function showMaintenanceScreen(message) {
  document.body.dataset.maintenanceActive =
    "true";

  document.title =
    "M.I.N.D. – Systemwartung";

  const screen =
    document.createElement("main");

  screen.className =
    "maintenanceScreen";

  const panel =
    document.createElement("section");

  panel.className =
    "maintenancePanel";

  const code =
    document.createElement("div");

  code.className =
    "maintenanceCode";

  code.textContent =
    "M.I.N.D. // SYSTEMSTATUS";

  const title =
    document.createElement("h1");

  title.textContent =
    "SYSTEMWARTUNG";

  const status =
    document.createElement("div");

  status.className =
    "maintenanceStatus";

  status.innerHTML =
    '<span class="maintenanceDot"></span>' +
    '<span>ARCHIVZUGRIFF VORÜBERGEHEND GESPERRT</span>';

  const text =
    document.createElement("p");

  text.textContent =
    message;

  const footer =
    document.createElement("div");

  footer.className =
    "maintenanceFooter";

  footer.textContent =
    "VERBINDUNG ZUM ARCHIV WIRD WIEDERHERGESTELLT …";

  panel.append(
    code,
    title,
    status,
    text,
    footer
  );

  screen.append(panel);

  document.body.replaceChildren(screen);
}


function startMaintenanceWatch(isAdministrator) {
  if (isAdministrator) {
    return;
  }

  setInterval(
    async () => {
      const maintenance =
        await loadMaintenanceStatus();

      const maintenanceIsVisible =
        document.body.dataset
          .maintenanceActive ===
        "true";

      if (
        maintenance.enabled &&
        !maintenanceIsVisible
      ) {
        showMaintenanceScreen(
          maintenance.message
        );

        return;
      }

      if (
        !maintenance.enabled &&
        maintenanceIsVisible
      ) {
        window.location.reload();
      }
    },
    15000
  );
}


/* =========================================================
   ARCHIV STARTEN
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    const mindUser =
      await loadMindUserFromSupabase();

    const userLevel =
      Number.parseInt(
        mindUser?.level,
        10
      ) || 0;

    const isAdministrator =
      userLevel >= 100;

    const maintenance =
      await loadMaintenanceStatus();

    startMaintenanceWatch(
      isAdministrator
    );

    if (
      maintenance.enabled &&
      !isAdministrator
    ) {
      showMaintenanceScreen(
        maintenance.message
      );

      return;
    }

/* =====================================================
   ARCHIVMUSIK – PLAYLIST
===================================================== */

/* =====================================================
   ARCHIVMUSIK – PLAYLIST UND STEUERUNG
===================================================== */

const playlist = [
  "sounds/archivmusik.mp3",
  "sounds/archivmusik1.mp3",
  "sounds/archivmusik2.mp3",
  "sounds/archivmusik3.mp3",
  "sounds/archivmusik4.mp3",
  "sounds/archivmusik5.mp3",
  "sounds/archivmusik6.mp3",
  "sounds/archivmusik7.mp3",
  "sounds/archivmusik8.mp3",
  "sounds/archivmusik9.mp3",
  "sounds/archivmusik10.mp3",
  "sounds/archivmusik11.mp3",
  "sounds/archivmusik12.mp3",
  "sounds/archivmusik13.mp3",
  "sounds/archivmusik14.mp3",
  "sounds/archivmusik15.mp3",
  "sounds/archivmusik16.mp3",
  "sounds/archivmusik17.mp3",
  "sounds/archivmusik18.mp3",
  "sounds/archivmusik19.mp3",

];

const archiveAudio = new Audio();

archiveAudio.volume = 0.35;
archiveAudio.preload = "auto";

let currentTrackIndex = -1;
let audioIsActive = false;


/* Button immer frisch suchen, weil home.html später geladen wird */
function getAudioButton() {
  return document.getElementById("audioToggle");
}


/* Zufälligen Titel auswählen – nicht zweimal direkt denselben */
function getRandomTrackIndex() {
  if (playlist.length <= 1) {
    return 0;
  }

  let newIndex;

  do {
    newIndex =
      Math.floor(Math.random() * playlist.length);
  } while (newIndex === currentTrackIndex);

  return newIndex;
}


/* Titel laden und abspielen */
async function playTrack(index) {
  if (!audioIsActive) {
    return;
  }

  currentTrackIndex = index;

  /*
    Erstellt eine vollständige Adresse aus dem relativen Pfad.
    Das verhindert Probleme mit Unterseiten wie data/home.html.
  */
  const trackUrl =
    new URL(
      playlist[currentTrackIndex],
      document.baseURI
    ).href;

  archiveAudio.pause();
  archiveAudio.src = trackUrl;
  archiveAudio.currentTime = 0;

  try {
    await archiveAudio.play();

    console.log(
      "Archivmusik gestartet:",
      trackUrl
    );
  } catch (error) {
    console.error(
      "Archivmusik konnte nicht gestartet werden:",
      trackUrl,
      error
    );

    audioIsActive = false;

    const button = getAudioButton();

    if (button) {
      button.textContent =
        "AUDIOFEHLER – DATEIPFAD PRÜFEN";

      button.classList.remove("active");
    }
  }
}


/* Archivmusik einschalten */
function enableArchiveAudio() {
  if (playlist.length === 0) {
    return;
  }

  audioIsActive = true;

  const button = getAudioButton();

  if (button) {
    button.textContent =
      "ARCHIV-AUDIO DEAKTIVIEREN";

    button.classList.add("active");
  }

  playTrack(
    getRandomTrackIndex()
  );
}


/* Archivmusik ausschalten */
function disableArchiveAudio() {
  audioIsActive = false;

  archiveAudio.pause();
  archiveAudio.currentTime = 0;

  const button = getAudioButton();

  if (button) {
    button.textContent =
      "ARCHIV-AUDIO AKTIVIEREN";

    button.classList.remove("active");
  }
}


/* Funktioniert auch bei später geladenem home.html */
document.addEventListener("click", event => {
  const button =
    event.target.closest("#audioToggle");

  if (!button) {
    return;
  }

  if (audioIsActive) {
    disableArchiveAudio();
  } else {
    enableArchiveAudio();
  }
});


/* Zeigt Lade- oder Dateifehler direkt an */
archiveAudio.addEventListener("error", () => {
  const button = getAudioButton();

  console.error(
    "Fehler beim Laden der Musikdatei:",
    archiveAudio.src,
    archiveAudio.error
  );

  if (button) {
    button.textContent =
      "DATEI NICHT GEFUNDEN";

    button.classList.remove("active");
  }

  audioIsActive = false;
});

/* Nach jedem Titel zufällig einen neuen auswählen */
archiveAudio.addEventListener("ended", () => {
  if (!audioIsActive) return;

  playTrack(getRandomTrackIndex());
});



    /* =====================================================
       GRUNDELEMENTE
    ===================================================== */

    const bootScreen =
      document.getElementById(
        "bootScreen"
      );

    const bootStatus =
      document.getElementById(
        "bootStatus"
      );

    const bootIdentity =
      document.getElementById(
        "bootIdentity"
      );

    const bootUserName =
      document.getElementById(
        "bootUserName"
      );

    const bootAccessRank =
      document.getElementById(
        "bootAccessRank"
      );

    const bootWelcome =
      document.getElementById(
        "bootWelcome"
      );

    const contentArea =
      document.getElementById(
        "contentArea"
      );

    const homeButton =
      document.getElementById(
        "homeButton"
      );

    const archiveUserName =
      document.getElementById(
        "archiveUserName"
      );

    const archiveAccessRank =
      document.getElementById(
        "archiveAccessRank"
      );

    const archiveUserLevel =
      document.getElementById(
        "archiveUserLevel"
      );

    const menuButtons =
      [
        ...document.querySelectorAll(
          ".menuButton"
        )
      ];



    /* =====================================================
       RANGDATEN
    ===================================================== */

    const rankInformation = {

      KEINE: {
        title:
          "Unbekannter Besucher",

        motto:
          "Das Archiv beobachtet jeden, der seine Hallen betritt."
      },


      DELTA: {
        title:
          "Neugieriger Aktenleser",

        motto:
          "Jede Wahrheit beginnt mit der Neugier, eine Akte zu öffnen."
      },


      GAMMA: {
        title:
          "Bewahrer der Chroniken",

        motto:
          "Erinnerungen vergehen. Die Chroniken vergessen niemals."
      },


      BETA: {
        title:
          "Forscher der Unterwelt",

        motto:
          "Wer in die Dunkelheit blickt, muss lernen, ihr zu widerstehen."
      },


      ALPHA: {
        title:
          "Hüter des Archivs",

        motto:
          "Das Archiv zu schützen bedeutet, die Wahrheit zu bewahren."
      },


      OMEGA: {
        title:
          "Schöpfer des Archivs",

        motto:
          "Der Schöpfer schreibt nicht die Wahrheit. Er erschafft den Ort, an dem sie bewahrt wird."
      }

    };


    /* =====================================================
       RANG AUS LEVEL BERECHNEN
    ===================================================== */

    function getRankName(level) {
      const numericLevel =
        Number(level) || 0;

      if (numericLevel >= 100) {
        return "OMEGA";
      }

      if (numericLevel >= 50) {
        return "ALPHA";
      }

      if (numericLevel >= 20) {
        return "BETA";
      }

      if (numericLevel >= 10) {
        return "GAMMA";
      }

      if (numericLevel >= 1) {
        return "DELTA";
      }

      return "KEINE";
    }


    /* =====================================================
       BENUTZERPROFIL ERSTELLEN
    ===================================================== */

    function createUserProfile(
      userData
    ) {
      const level =
        Number(
          userData?.level || 0
        );

      const rank =
        getRankName(level);

      const defaultRankData =
        rankInformation[rank] ||
        rankInformation.KEINE;

      return {
        name:
          userData?.name ||
          "GAST",

        level,

        rank,

        title:
          userData?.title ||
          defaultRankData.title,

        motto:
          userData?.motto ||
          defaultRankData.motto
      };
    }


    /* =====================================================
       STANDARDPROFIL
    ===================================================== */

    let currentUser =
      createUserProfile({
        name:
          "GAST",

        level:
          0
      });


    /* =====================================================
       ZUGANGSCODE AUS URL LADEN
    ===================================================== */

    function loadAccessCode() {
      const parameters =
        new URLSearchParams(
          window.location.search
        );

      const code =
        String(
          parameters.get("code") ||
          ""
        ).trim();

      const supabaseCode =
        String(
          mindUser?.access_code ||
          ""
        ).trim();


      /*
        Dynamischer Zuschauerzugang
        aus Supabase
      */

      if (
        mindUser &&
        code &&
        code === supabaseCode
      ) {
        currentUser =
          createUserProfile({
            name:
              String(
                mindUser.twitch_name ||
                "UNBEKANNTER NUTZER"
              ).toUpperCase(),

            level:
              Number.parseInt(
                mindUser.level,
                10
              ) || 1
          });
      }

      updateUserTerminal();
      updateMenuAccess();
    }


    /* =====================================================
       BENUTZERANZEIGE OBEN RECHTS
    ===================================================== */

    function updateUserTerminal() {
      if (archiveUserName) {
        archiveUserName.textContent =
        currentUser.level > 0
        ? currentUser.name
        : "GAST";
    }

      if (archiveAccessRank) {
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

  if (archiveUserLevel) {
    archiveUserLevel.textContent =
      currentUser.level;
  }
}

/* =====================================================
   MENÜZUGRIFF AKTUALISIEREN
===================================================== */

function updateMenuAccess() {

  menuButtons.forEach(
    button => {

      const requiredLevel =
        getRequiredLevel(
          button
        );

      const hasAccess =
        currentUser.level >=
        requiredLevel;


      /* Freigeschaltet / gesperrt markieren */

      button.classList.toggle(
        "unlocked",
        hasAccess
      );

      button.classList.toggle(
        "locked",
        !hasAccess
      );
   })
}
   

    /* =====================================================
       STARTSEQUENZ
    ===================================================== */

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
        currentUser.rank
          .toLowerCase();

      if (
        [
          "omega",
          "alpha",
          "beta",
          "gamma",
          "delta"
        ].includes(rankClass)
      ) {
        bootAccessRank
          .classList
          .add(rankClass);
      } else {
        bootAccessRank
          .classList
          .add("none");
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
          bootIdentity
            .classList
            .add("show");
        }

        setBootStatus(
          "IDENTITÄT BESTÄTIGT"
        );
      }, 2000);


      setTimeout(() => {
        if (bootWelcome) {
          bootWelcome.textContent =
            currentUser.level > 0
              ? `WILLKOMMEN ZURÜCK, ${currentUser.name}`
              : "WILLKOMMEN IM M.I.N.D. ARCHIV";

          bootWelcome
            .classList
            .add("show");
        }

        setBootStatus(
          "SICHERHEITSFREIGABE AKZEPTIERT"
        );
      }, 5000);


      setTimeout(() => {
        setBootStatus(
          "ARCHIVZENTRALE WIRD GELADEN..."
        );
      }, 7000);


      setTimeout(async () => {
        await showHome();

        if (bootScreen) {
          bootScreen
            .classList
            .add("hidden");
        }
      }, 10000);
    }


    function setBootStatus(text) {
      if (bootStatus) {
        bootStatus.textContent =
          text;
      }
    }


    /* =====================================================
       MENÜMARKIERUNG
    ===================================================== */

    function clearActiveButtons() {
      menuButtons.forEach(
        button => {
          button.classList.remove(
            "active"
          );
        }
      );
    }


    function activateMenuButton(
      pageName
    ) {
      clearActiveButtons();

      const normalizedPage =
        normalizePageName(
          pageName
        );

      const selectedButton =
        menuButtons.find(
          button => {
            return (
              normalizePageName(
                button.dataset.page
              ) === normalizedPage
            );
          }
        );

      if (selectedButton) {
        selectedButton
          .classList
          .add("active");
      }
    }


    /* =====================================================
       DATEIPFADE
    ===================================================== */

    function normalizePageName(
      pageName
    ) {
      if (!pageName) {
        return "";
      }

      return String(pageName)
        .replace(/^data\//, "")
        .replace(/\.html$/, "");
    }


    function createFilePath(
      pageName
    ) {
      const normalizedPage =
        normalizePageName(
          pageName
        );

      if (!normalizedPage) {
        return null;
      }

      return (
        `data/${normalizedPage}.html`
      );
    }


/* =====================================================
   HANDY – NACH DEM LADEN ZUM INHALT SPRINGEN
===================================================== */

function scrollToContentOnMobile() {

  /* Nur auf Handy und Tablet ausführen */
  if (
    !window.matchMedia("(max-width: 960px)").matches ||
    !contentArea
  ) {
    return;
  }

  /*
    Kurz warten, damit der neue Inhalt zuerst
    vollständig in die Seite eingesetzt werden kann.
  */
  setTimeout(() => {

    const position =
      contentArea.getBoundingClientRect().top +
      window.scrollY -
      12;

    window.scrollTo({
      top: position,
      behavior: "smooth"
    });

  }, 100);


  /*
    Sicherheitskorrektur:
    Falls Bilder oder andere Elemente die Seite
    nachträglich verschieben, wird die Position
    noch einmal korrigiert.
  */
  setTimeout(() => {

    const position =
      contentArea.getBoundingClientRect().top +
      window.scrollY -
      12;

    window.scrollTo({
      top: position,
      behavior: "auto"
    });

  }, 600);
}

    /* =====================================================
   HTML-DATEI LADEN
===================================================== */

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
    /* Auf dem Handy automatisch zum geöffneten Inhalt springen */
    scrollToContentOnMobile();

    return true;

  } catch (error) {
    console.error(
      "M.I.N.D.-Archivfehler:",
      error
    );

    showFileError(
      filePath
    );

    return false;
  }
}

    

    /* =====================================================
       DYNAMISCHE SEITENINFORMATIONEN
    ===================================================== */

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


    function setTextForAll(
      selector,
      value
    ) {
      document
        .querySelectorAll(
          selector
        )
        .forEach(
          element => {
            element.textContent =
              value;
          }
        );
    }


    function getAccessDescription() {
      switch (
        currentUser.rank
      ) {
        case "OMEGA":
          return (
            "SCHÖPFER DES ARCHIVS"
          );

        case "ALPHA":
          return (
            "HÜTER DES ARCHIVS"
          );

        case "BETA":
          return (
            "FORSCHER DER UNTERWELT"
          );

        case "GAMMA":
          return (
            "BEWAHRER DER CHRONIKEN"
          );

        case "DELTA":
          return (
            "NEUGIERIGER AKTENLESER"
          );

        default:
          return (
            "KEINE ARCHIVFREIGABE"
          );
      }
    }


    function updateArchiveCounts() {
      let unlockedCount =
        0;

      let lockedCount =
        0;

      menuButtons.forEach(
        button => {
          const requiredLevel =
            getRequiredLevel(
              button
            );

          if (
            currentUser.level >=
            requiredLevel
          ) {
            unlockedCount++;
          } else {
            lockedCount++;
          }
        }
      );

      setTextForAll(
        "[data-unlocked-count]",
        unlockedCount
      );

      setTextForAll(
        "[data-locked-count]",
        lockedCount
      );
    }


    /* =====================================================
       HOME-SEITE
    ===================================================== */

    async function showHome() {
      clearActiveButtons();

      await loadPage(
        "data/home.html"
      );
    }


    /* =====================================================
       AKTE ÖFFNEN
    ===================================================== */

    async function openArchivePage(
      pageName,
      sourceElement = null
    ) {
      const normalizedPage =
        normalizePageName(
          pageName
        );

      if (!normalizedPage) {
        return;
      }

      const matchingMenuButton =
        findMenuButton(
          normalizedPage
        );

      const requiredLevel =
        sourceElement?.dataset.level
          ? getRequiredLevel(
              sourceElement
            )
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
          sourceElement
            ?.textContent
            .trim() ||

          matchingMenuButton
            ?.textContent
            .trim() ||

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

      await loadPage(
        filePath
      );
    }


    function findMenuButton(
      pageName
    ) {
      const normalizedPage =
        normalizePageName(
          pageName
        );

      return menuButtons.find(
        button => {
          return (
            normalizePageName(
              button.dataset.page
            ) === normalizedPage
          );
        }
      );
    }


    function getRequiredLevel(
      element
    ) {
      const level =
        Number(
          element?.dataset.level
        );

      return Number.isFinite(level)
        ? level
        : 999;
    }


    /* =====================================================
       GESPERRTE AKTE
    ===================================================== */

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

      /* Auch bei gesperrten Akten zum Inhaltsbereich springen */
      scrollToContentOnMobile();
    }


    /* =====================================================
       DATEIFEHLER
    ===================================================== */

    function showFileError(
      filePath
    ) {
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


    /* =====================================================
       KNÖPFE INNERHALB GELADENER SEITEN
    ===================================================== */

    function connectPageButtons() {
      const pageLinks =
        document.querySelectorAll(
          "[data-open-page]"
        );

      pageLinks.forEach(
        button => {
          button.addEventListener(
            "click",
            () => {
              openArchivePage(
                button.dataset.openPage,
                button
              );
            }
          );
        }
      );
    }


    function updatePageTileAccess() {
      const pageLinks =
        document.querySelectorAll(
          "[data-open-page]"
        );

      pageLinks.forEach(
        element => {
          const requiredLevel =
            getRequiredLevel(
              element
            );

          const hasAccess =
            currentUser.level >=
            requiredLevel;

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
            const individualText =
              statusElement.dataset.openText ||
              statusElement.textContent.trim();

            statusElement.dataset.openText =
              individualText;

            statusElement.textContent =
              hasAccess
              ? individualText
              : "ZUGRIFF GESPERRT";
          }
        }
      );
    }


    /* =====================================================
       LINKES MENÜ
    ===================================================== */

    menuButtons.forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            openArchivePage(
              button.dataset.page,
              button
            );
          }
        );
      }
    );


    /* =====================================================
       HOME-BUTTON
    ===================================================== */

    if (homeButton) {
      homeButton.addEventListener(
        "click",
        showHome
      );
    }


    /* =====================================================
       HILFSFUNKTIONEN
    ===================================================== */

    function capitalizeWord(
      word
    ) {
      if (!word) {
        return "";
      }

      return (
        word
          .charAt(0)
          .toUpperCase() +

        word.slice(1)
      );
    }


    function escapeHtml(
      value
    ) {
      return String(value)
        .replaceAll(
          "&",
          "&amp;"
        )
        .replaceAll(
          "<",
          "&lt;"
        )
        .replaceAll(
          ">",
          "&gt;"
        )
        .replaceAll(
          '"',
          "&quot;"
        )
        .replaceAll(
          "'",
          "&#039;"
        );
    }


    /* =====================================================
       SYSTEM STARTEN
    ===================================================== */

    loadAccessCode();
    startBootSequence();

  }
);

