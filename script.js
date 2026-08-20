/* =========================================================
   M.I.N.D. ARCHIV \u2013 ZENTRALE STEUERUNG
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
        "M.I.N.D.: Kein Benutzer f\u00FCr diesen Code gefunden."
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
          "Das Archiv ist aufgrund von Wartungsarbeiten vor\u00FCbergehend nicht verf\u00FCgbar."
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
    "M.I.N.D. \u2013 Systemwartung";

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
    '<span>ARCHIVZUGRIFF VOR\u00DCBERGEHEND GESPERRT</span>';

  const text =
    document.createElement("p");

  text.textContent =
    message;

  const footer =
    document.createElement("div");

  footer.className =
    "maintenanceFooter";

  footer.textContent =
    "VERBINDUNG ZUM ARCHIV WIRD WIEDERHERGESTELLT \u2026";

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
   ARCHIVMUSIK \u2013 PLAYLIST UND STEUERUNG
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
  "sounds/archivmusik20.mp3",
  "sounds/archivmusik21.mp3",
  "sounds/archivmusik22.mp3",
  "sounds/archivmusik23.mp3",
  "sounds/archivmusik24.mp3",
  "sounds/archivmusik25.mp3",
  "sounds/archivmusik26.mp3",
  "sounds/archivmusik27.mp3",
  "sounds/archivmusik28.mp3",
  "sounds/archivmusik29.mp3",
  "sounds/archivmusik30.mp3",
  "sounds/archivmusik31.mp3",
  "sounds/archivmusik32.mp3",
  "sounds/archivmusik33.mp3",
  "sounds/archivmusik34.mp3",
  "sounds/archivmusik35.mp3",
  "sounds/archivmusik36.mp3",
  "sounds/archivmusik37.mp3",
  "sounds/archivmusik38.mp3",
  "sounds/archivmusik39.mp3",
];

const archiveAudio = new Audio();

archiveAudio.volume = 0.35;
archiveAudio.preload = "auto";

let currentTrackIndex = -1;
let audioIsActive = false;


/* Button immer frisch suchen, weil home.html sp\u00E4ter geladen wird */
function getAudioButton() {
  return document.getElementById("audioToggle");
}


/* Zuf\u00E4lligen Titel ausw\u00E4hlen \u2013 nicht zweimal direkt denselben */
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
    Erstellt eine vollst\u00E4ndige Adresse aus dem relativen Pfad.
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
        "AUDIOFEHLER \u2013 DATEIPFAD PR\u00DCFEN";

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


/* Funktioniert auch bei sp\u00E4ter geladenem home.html */
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

/* Nach jedem Titel zuf\u00E4llig einen neuen ausw\u00E4hlen */
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
          "Jede Wahrheit beginnt mit der Neugier, eine Akte zu \u00F6ffnen."
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
          "H\u00FCter des Archivs",

        motto:
          "Das Archiv zu sch\u00FCtzen bedeutet, die Wahrheit zu bewahren."
      },


      OMEGA: {
        title:
          "Sch\u00F6pfer des Archivs",

        motto:
          "Der Sch\u00F6pfer schreibt nicht die Wahrheit. Er erschafft den Ort, an dem sie bewahrt wird."
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
   MEN\u00DCZUGRIFF AKTUALISIEREN
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
        `${currentUser.rank} \u2013 LEVEL ${currentUser.level}`;

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
          "IDENTIT\u00C4T WIRD GEPR\u00DCFT..."
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
          "IDENTIT\u00C4T BEST\u00C4TIGT"
        );
      }, 2000);


      setTimeout(() => {
        if (bootWelcome) {
          bootWelcome.textContent =
            currentUser.level > 0
              ? `WILLKOMMEN ZUR\u00DCCK, ${currentUser.name}`
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
        showFirstVisitWelcome();
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
       MEN\u00DCMARKIERUNG
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
   HANDY \u2013 NACH DEM LADEN ZUM INHALT SPRINGEN
===================================================== */


function scrollToContentOnMobile() {

  /* Nur auf Handy und Tablet ausf\u00FChren */
  if (
    !window.matchMedia("(max-width: 960px)").matches ||
    !contentArea
  ) {
    return;
  }

  /*
    Kurz warten, damit der neue Inhalt zuerst
    vollst\u00E4ndig in die Seite eingesetzt werden kann.
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
    nachtr\u00E4glich verschieben, wird die Position
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
   PC – BEIM AKTENWECHSEL NACH OBEN SPRINGEN
===================================================== */

function scrollToTopOnDesktop() {
  if (
    window.matchMedia(
      "(max-width: 960px)"
    ).matches
  ) {
    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });
}

    /* =====================================================
   KLASSIFIZIERTE AKTENNACHTR\u00C4GE
===================================================== */

function connectClassifiedReveals() {
  const revealBlocks =
    document.querySelectorAll(
      ".classifiedReveal"
    );

  revealBlocks.forEach(
    block => {
      const requiredLevel =
        Number(
          block.dataset.revealLevel
        ) || 999;

      const status =
        block.querySelector(
          "[data-reveal-status]"
        );

      const button =
        block.querySelector(
          "[data-reveal-button]"
        );

      const content =
        block.querySelector(
          "[data-reveal-content]"
        );

      const hasAccess =
        currentUser.level >=
        requiredLevel;


      block.classList.toggle(
        "classifiedRevealUnlocked",
        hasAccess
      );

      block.classList.toggle(
        "classifiedRevealLocked",
        !hasAccess
      );


      if (status) {
        status.textContent =
          hasAccess
            ? `SICHERHEITSFREIGABE BEST\u00C4TIGT \u00B7 LEVEL ${requiredLevel}`
            : `ZUGRIFF GESPERRT \u00B7 LEVEL ${requiredLevel} BEN\u00D6TIGT`;
      }


      if (!button || !content) {
        return;
      }


      /* Inhalt beim Laden immer schlie\u00DFen */

      content.hidden = true;

      button.hidden =
        !hasAccess;


      if (!hasAccess) {
        return;
      }


      /*
        Verhindert doppelte Klickverbindungen,
        falls die Seite erneut aktualisiert wird.
      */

      if (
        button.dataset.revealConnected ===
        "true"
      ) {
        return;
      }

      button.dataset.revealConnected =
        "true";


      button.addEventListener(
        "click",
        () => {
          const contentWillOpen =
            content.hidden;

          content.hidden =
            !contentWillOpen;

          block.classList.toggle(
            "classifiedRevealOpen",
            contentWillOpen
          );

          button.textContent =
            contentWillOpen
              ? "AKTENNACHTRAG SCHLIESSEN"
              : "AKTENNACHTRAG ENTSCHL\u00DCSSELN";
        }
      );
    }
  );
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
    connectClassifiedReveals();
    addArchiveReadingGuide(filePath);

    /* Auf dem PC nach ganz oben springen */
    scrollToTopOnDesktop();

    /* Auf dem Handy automatisch zum ge\u00F6ffneten Inhalt springen */
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
        `\u201E${currentUser.motto}\u201C`
      );

      setTextForAll(
        "[data-access-description]",
        getAccessDescription()
      );

      updateArchiveCounts();
      updateHomeUnlockOverview();
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
            "SCH\u00D6PFER DES ARCHIVS"
          );

        case "ALPHA":
          return (
            "H\u00DCTER DES ARCHIVS"
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

    /* =====================================================
   FREIGABEPLAN DER ARCHIVINHALTE
===================================================== */

const archiveUnlockPlan = [

  {
    level: 1,
    type: "CHRONIKEN DER DUNKELHEIT",
    title: "PROLOG",
    page: "kapitel/prolog"
  },

  {
    level: 2,
    type: "CHRONIKEN DER DUNKELHEIT",
    title: "EPISODE 1 \u2013 STIMMEN IM WALD",
    page: "kapitel/kapitel_1/kapitel_1_episode_1"
  },

  {
    level: 2,
    type: "PERSONENAKTE",
    title: "MATTHIAS",
    page: "personenarchiv/matthias"
  },

  {
    level: 3,
    type: "CHRONIKEN DER DUNKELHEIT",
    title: "EPISODE 2 \u2013 LIAM",
    page: "kapitel/kapitel_1/kapitel_1_episode_2"
  },

  {
    level: 4,
    type: "PERSONENAKTE",
    title: "LIAM",
    page: "personenarchiv/liam"
  },

  {
    level: 4,
    type: "PERSONENAKTE",
    title: "DER OKKULTIST",
    page: "personenarchiv/okkultist"
  },

  {
    level: 5,
    type: "ARTEFAKTAKTE",
    title: "GESCHICHTE DER MASKEN",
    page: "masken_des_unheils/geschichte"
  },

  {
    level: 5,
    type: "ARTEFAKTAKTE",
    title: "ASKARION",
    page: "masken_des_unheils/askarion"
  },

  {
    level: 6,
    type: "CHRONIKEN DER DUNKELHEIT",
    title: "EPISODE 3 \u2013 THAR\u2019GHUL",
    page: "kapitel/kapitel_1/kapitel_1_episode_3"
  },

  {
    level: 7,
    type: "ORTSAKTE",
    title: "DIE FESTUNG THAR\u2019GHUL",
    page: "ortsarchiv/die_festung_tharghul"
  },

  {
    level: 7,
    type: "PERSONENAKTE",
    title: "DIE BRUDERSCHAFT VON THAR\u2019GHUL",
    page: "personenarchiv/bruderschaft_von_thar'ghul"
  },

  {
    level: 8,
    type: "CHRONIKEN DER DUNKELHEIT",
    title: "EPISODE 4 \u2013 DAS RITUAL",
    page: "kapitel/kapitel_1/kapitel_1_episode_4"
  },

  {
    level: 9,
    type: "BESTIARIUM",
    title: "SLASHER",
    page: "bestarium/slasher"
  },

  {
    level: 9,
    type: "BESTIARIUM",
    title: "KON\u2019DOR \u2013 DER TODESVOGEL",
    page: "bestarium/kondor"
  }

];


/* =====================================================
   LEITFADEN AM ENDE EINER ARCHIVAKTE
===================================================== */

function addArchiveReadingGuide(currentFilePath) {
  if (
    !contentArea ||
    !currentFilePath
  ) {
    return;
  }

  const currentPage =
    normalizePageName(
      currentFilePath
    );

  const currentIndex =
    archiveUnlockPlan.findIndex(
      archiveItem =>
        normalizePageName(
          archiveItem.page
        ) === currentPage
    );

  /* Auf der Home-Seite und auf nicht gelisteten Seiten nichts erg\u00E4nzen. */
  if (currentIndex < 0) {
    return;
  }

  const currentItem =
    archiveUnlockPlan[currentIndex];

  const nextItem =
    archiveUnlockPlan[currentIndex + 1];

  const guide =
    document.createElement("section");

  guide.className =
    "archiveReadingGuide";

  if (!nextItem) {
    guide.classList.add(
      "archiveReadingGuideComplete"
    );

    guide.innerHTML = `
      <div class="archiveReadingGuideLabel">
        ARCHIV-LEITFADEN
      </div>

      <div class="archiveReadingGuideTitle">
        AKTUELLER ARCHIVSTAND ABGESCHLOSSEN
      </div>

      <div class="archiveReadingGuideText">
        Du hast alle derzeit im Leitfaden erfassten Akten gelesen.
      </div>
    `;

    contentArea.append(guide);
    return;
  }

  const hasAccess =
    currentUser.level >=
    nextItem.level;

  guide.classList.add(
    hasAccess
      ? "archiveReadingGuideUnlocked"
      : "archiveReadingGuideLocked"
  );

  guide.innerHTML = `
    <div class="archiveReadingGuideLabel">
      ARCHIV-LEITFADEN
    </div>

    <div class="archiveReadingGuideProgress">
      &#10003; ${escapeHtml(currentItem.title)} ABGESCHLOSSEN
    </div>

    <div class="archiveReadingGuideNext">
      ALS N&Auml;CHSTES
    </div>

    <div class="archiveReadingGuideType">
      ${escapeHtml(nextItem.type)} &middot; LEVEL ${nextItem.level}
    </div>

    <div class="archiveReadingGuideTitle">
      ${escapeHtml(nextItem.title)}
    </div>

    <button
      class="archiveReadingGuideButton"
      type="button"
      ${hasAccess ? "" : "disabled"}
    >
      ${
        hasAccess
          ? "N&Auml;CHSTE AKTE &Ouml;FFNEN"
          : `NOCH GESPERRT &middot; LEVEL ${nextItem.level} BEN&Ouml;TIGT`
      }
    </button>
  `;

  const guideButton =
    guide.querySelector(
      ".archiveReadingGuideButton"
    );

  if (
    hasAccess &&
    guideButton
  ) {
    guideButton.addEventListener(
      "click",
      () => {
        openArchivePage(
          nextItem.page,
          guideButton
        );
      }
    );
  }

  contentArea.append(guide);
}


/* =====================================================
   FREIGABEKACHEL ERSTELLEN
===================================================== */

function createHomeUnlockCard(
  archiveItem,
  isNewUnlock = false
) {
  const button =
    document.createElement("button");

  button.type =
    "button";

  button.className =
    "homeUnlockCard";

  if (isNewUnlock) {
    button.classList.add(
      "homeUnlockCardNew"
    );
  }

  button.dataset.level =
    archiveItem.level;

  button.dataset.openPage =
    archiveItem.page;

  button.innerHTML = `
    <span class="homeUnlockCardLevel">
      LEVEL ${archiveItem.level}
    </span>

    <span class="homeUnlockCardType">
      ${escapeHtml(archiveItem.type)}
    </span>

    <span class="homeUnlockCardTitle">
      ${escapeHtml(archiveItem.title)}
    </span>

    <span class="homeUnlockCardStatus">
      &#10003; FREIGESCHALTET &middot; &Ouml;FFNEN
    </span>
  `;

  button.addEventListener(
    "click",
    () => {
      openArchivePage(
        archiveItem.page,
        button
      );
    }
  );

  return button;
}


/* =====================================================
   HOME-FREIGABEN ANZEIGEN
===================================================== */

function updateHomeUnlockOverview() {
  const newUnlockPanel =
    document.querySelector(
      "[data-new-unlock-panel]"
    );

  const newUnlockHeadline =
    document.querySelector(
      "[data-new-unlock-headline]"
    );

  const newUnlockText =
    document.querySelector(
      "[data-new-unlock-text]"
    );

  const newUnlockList =
    document.querySelector(
      "[data-new-unlock-list]"
    );

  const allUnlockList =
    document.querySelector(
      "[data-all-unlock-list]"
    );


  /*
    Die Funktion wird nur ausgef\u00FChrt,
    wenn gerade die Home-Seite ge\u00F6ffnet ist.
  */

  if (
    !newUnlockPanel ||
    !newUnlockList ||
    !allUnlockList
  ) {
    return;
  }


  const availableItems =
    archiveUnlockPlan.filter(
      archiveItem =>
        currentUser.level >=
        archiveItem.level
    );


  newUnlockList.replaceChildren();
  allUnlockList.replaceChildren();


  /*
    Alle bisher freigeschalteten Inhalte anzeigen
  */

  availableItems.forEach(
    archiveItem => {
      allUnlockList.append(
        createHomeUnlockCard(
          archiveItem
        )
      );
    }
  );


  /*
    F\u00FCr Besucher ohne Freigabe
  */

  if (availableItems.length === 0) {
    const emptyMessage =
      document.createElement("div");

    emptyMessage.className =
      "homeUnlockEmpty";

    emptyMessage.textContent =
      "NOCH KEINE ARCHIVINHALTE FREIGESCHALTET.";

    allUnlockList.append(
      emptyMessage
    );

    newUnlockPanel.hidden =
      true;

    return;
  }


  /*
    Zuletzt angesehenes Benutzerlevel laden
  */

  const userStorageName =
    String(
      currentUser.name ||
      "gast"
    )
      .toLowerCase()
      .replace(
        /[^a-z0-9\u00E4\u00F6\u00FC\u00DF_-]/g,
        "_"
      );

  const storageKey =
    `mind_last_seen_level_${userStorageName}`;

  let previousLevel =
    null;

  try {
    const storedLevel =
      localStorage.getItem(
        storageKey
      );

    if (storedLevel !== null) {
      previousLevel =
        Number(storedLevel);
    }
  } catch (error) {
    console.warn(
      "M.I.N.D.: Letztes Level konnte nicht geladen werden.",
      error
    );
  }


  let highlightedItems = [];
  let headlineText = "";
  let informationText = "";


  /*
    Tats\u00E4chlicher Levelaufstieg
  */

  if (
    Number.isFinite(previousLevel) &&
    currentUser.level > previousLevel
  ) {
    highlightedItems =
      archiveUnlockPlan.filter(
        archiveItem =>
          archiveItem.level >
            previousLevel &&

          archiveItem.level <=
            currentUser.level
      );

    headlineText =
      `GL\u00DCCKWUNSCH \u2013 LEVEL ${currentUser.level} ERREICHT`;

    informationText =
      "FOLGENDE ARCHIVINHALTE WURDEN NEU FREIGESCHALTET:";
  }


  /*
    Erster Besuch oder kein neuer Levelaufstieg:
    Die zuletzt erreichte Freigabestufe anzeigen.
  */

  if (highlightedItems.length === 0) {
    const highestUnlockLevel =
      Math.max(
        ...availableItems.map(
          archiveItem =>
            archiveItem.level
        )
      );

    highlightedItems =
      availableItems.filter(
        archiveItem =>
          archiveItem.level ===
          highestUnlockLevel
      );

    headlineText =
      `DEINE FREIGABEN AUF LEVEL ${highestUnlockLevel}`;

    informationText =
      "ZULETZT FREIGESCHALTETE ARCHIVINHALTE:";
  }


  if (newUnlockHeadline) {
    newUnlockHeadline.textContent =
      headlineText;
  }

  if (newUnlockText) {
    newUnlockText.textContent =
      informationText;
  }


  highlightedItems.forEach(
    archiveItem => {
      newUnlockList.append(
        createHomeUnlockCard(
          archiveItem,
          true
        )
      );
    }
  );


  newUnlockPanel.hidden =
    false;


  /*
    Aktuelles Level f\u00FCr den n\u00E4chsten Besuch speichern
  */

  try {
    localStorage.setItem(
      storageKey,
      String(currentUser.level)
    );
  } catch (error) {
    console.warn(
      "M.I.N.D.: Aktuelles Level konnte nicht gespeichert werden.",
      error
    );
  }
}
/* =====================================================
   BEGRÜSSUNG BEIM ERSTEN BESUCH
===================================================== */

function showFirstVisitWelcome() {
  const userStorageName =
    String(currentUser.name || "gast")
      .toLowerCase()
      .replace(
        /[^a-z0-9äöüß_-]/g,
        "_"
      );

  const storageKey =
    `mind_welcome_seen_${userStorageName}`;

  try {
    if (
      localStorage.getItem(storageKey) ===
      "true"
    ) {
      return;
    }
  } catch (error) {
    console.warn(
      "Begrüßungsstatus konnte nicht geladen werden.",
      error
    );
  }

  const welcomeScreen =
    document.createElement("div");

  welcomeScreen.className =
    "firstVisitWelcome";

  welcomeScreen.innerHTML = `
    <section class="firstVisitWelcomePanel">

      <div class="firstVisitWelcomeLabel">
        M.I.N.D. ARCHIVSYSTEM
      </div>

      <h2 class="firstVisitWelcomeTitle">
        WILLKOMMEN IM M.I.N.D.-ARCHIV
      </h2>

      <div class="firstVisitWelcomeText">

        <p>
          Weiter unten findest du alle Archivbereiche,
          die für deine Sicherheitsstufe freigeschaltet sind.
        </p>

        <p>
          Wenn du möchtest, kannst du oben die
          atmosphärische Archivmusik aktivieren.
        </p>

        <p>
          Viel Spaß beim Entdecken.
        </p>

      </div>

      <button
        class="firstVisitWelcomeButton"
        type="button"
      >
        ARCHIV BETRETEN
      </button>

    </section>
  `;

  document.body.append(
    welcomeScreen
  );

  const welcomeButton =
    welcomeScreen.querySelector(
      ".firstVisitWelcomeButton"
    );

  welcomeButton.addEventListener(
    "click",
    () => {
      try {
        localStorage.setItem(
          storageKey,
          "true"
        );
      } catch (error) {
        console.warn(
          "Begrüßungsstatus konnte nicht gespeichert werden.",
          error
        );
      }

      welcomeScreen.classList.add(
        "firstVisitWelcomeClosing"
      );

      setTimeout(
        () => {
          welcomeScreen.remove();
        },
        400
      );
    }
  );
}

    async function showHome() {
      clearActiveButtons();

      await loadPage(
        "data/home.html"
      );
    }


    /* =====================================================
       AKTE \u00D6FFNEN
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
              \u{1F512}
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

              BEN\u00D6TIGTER RANG:
              ${getRankName(requiredLevel)}

              <br>

              BEN\u00D6TIGTES LEVEL:
              ${requiredLevel}

              <br><br>

              DIESE ARCHIVAKTE WURDE
              NOCH NICHT ENTSCHL\u00DCSSELT.

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
              \u26A0
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

              PR\u00DCFE DEN DATEINAMEN,
              DIE ENDUNG .HTML UND
              DEN ORDNERPFAD.

            </div>

          </div>

        </div>
      `;
    }


    /* =====================================================
       KN\u00D6PFE INNERHALB GELADENER SEITEN
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
              : `ZUGRIFF GESPERRT \u00B7 LEVEL ${requiredLevel} BEN\u00D6TIGT`;
          }
        }
      );
    }


    /* =====================================================
       LINKES MEN\u00DC
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

    const guideButton =
      guide.querySelector(
        ".archiveReadingGuideButton"
      );

    if (
      hasAccess &&
      guideButton
    ) {
      guideButton.addEventListener(
        "click",
        () => {
          openArchivePage(
            nextItem.page,
            guideButton
          );
        }
      );
    }

    contentArea.append(guide);
  }
);


/* =====================================================
   FREIGABEKACHEL ERSTELLEN
===================================================== */

function createHomeUnlockCard(
  archiveItem,
  isNewUnlock = false
) {
  const button =
    document.createElement("button");

  button.type =
    "button";

  button.className =
    "homeUnlockCard";

  if (isNewUnlock) {
    button.classList.add(
      "homeUnlockCardNew"
    );
  }

  button.dataset.level =
    archiveItem.level;

  button.dataset.openPage =
    archiveItem.page;

  button.innerHTML = `
    <span class="homeUnlockCardLevel">
      LEVEL ${archiveItem.level}
    </span>

    <span class="homeUnlockCardType">
      ${escapeHtml(archiveItem.type)}
    </span>

    <span class="homeUnlockCardTitle">
      ${escapeHtml(archiveItem.title)}
    </span>

    <span class="homeUnlockCardStatus">
      âœ“ FREIGESCHALTET Â· Ã-FFNEN
    </span>
  `;

  button.addEventListener(
    "click",
    () => {
      openArchivePage(
        archiveItem.page,
        button
      );
    }
  );

  return button;
}


/* =====================================================
   HOME-FREIGABEN ANZEIGEN
===================================================== */

function updateHomeUnlockOverview() {
  const newUnlockPanel =
    document.querySelector(
      "[data-new-unlock-panel]"
    );

  const newUnlockHeadline =
    document.querySelector(
      "[data-new-unlock-headline]"
    );

  const newUnlockText =
    document.querySelector(
      "[data-new-unlock-text]"
    );

  const newUnlockList =
    document.querySelector(
      "[data-new-unlock-list]"
    );

  const allUnlockList =
    document.querySelector(
      "[data-all-unlock-list]"
    );


  /*
    Die Funktion wird nur ausgefÃ¼hrt,
    wenn gerade die Home-Seite geÃ¶ffnet ist.
  */

  if (
    !newUnlockPanel ||
    !newUnlockList ||
    !allUnlockList
  ) {
    return;
  }


  const availableItems =
    archiveUnlockPlan.filter(
      archiveItem =>
        currentUser.level >=
        archiveItem.level
    );


  newUnlockList.replaceChildren();
  allUnlockList.replaceChildren();


  /*
    Alle bisher freigeschalteten Inhalte anzeigen
  */

  availableItems.forEach(
    archiveItem => {
      allUnlockList.append(
        createHomeUnlockCard(
          archiveItem
        )
      );
    }
  );


  /*
    FÃ¼r Besucher ohne Freigabe
  */

  if (availableItems.length === 0) {
    const emptyMessage =
      document.createElement("div");

    emptyMessage.className =
      "homeUnlockEmpty";

    emptyMessage.textContent =
      "NOCH KEINE ARCHIVINHALTE FREIGESCHALTET.";

    allUnlockList.append(
      emptyMessage
    );

    newUnlockPanel.hidden =
      true;

    return;
  }


  /*
    Zuletzt angesehenes Benutzerlevel laden
  */

  const userStorageName =
    String(
      currentUser.name ||
      "gast"
    )
      .toLowerCase()
      .replace(
        /[^a-z0-9Ã¤Ã¶Ã¼ÃŸ_-]/g,
        "_"
      );

  const storageKey =
    `mind_last_seen_level_${userStorageName}`;

  let previousLevel =
    null;

  try {
    const storedLevel =
      localStorage.getItem(
        storageKey
      );

    if (storedLevel !== null) {
      previousLevel =
        Number(storedLevel);
    }
  } catch (error) {
    console.warn(
      "M.I.N.D.: Letztes Level konnte nicht geladen werden.",
      error
    );
  }


  let highlightedItems = [];
  let headlineText = "";
  let informationText = "";


  /*
    TatsÃ¤chlicher Levelaufstieg
  */

  if (
    Number.isFinite(previousLevel) &&
    currentUser.level > previousLevel
  ) {
    highlightedItems =
      archiveUnlockPlan.filter(
        archiveItem =>
          archiveItem.level >
            previousLevel &&

          archiveItem.level <=
            currentUser.level
      );

    headlineText =
      `GLÃœCKWUNSCH â€“ LEVEL ${currentUser.level} ERREICHT`;

    informationText =
      "FOLGENDE ARCHIVINHALTE WURDEN NEU FREIGESCHALTET:";
  }


  /*
    Erster Besuch oder kein neuer Levelaufstieg:
    Die zuletzt erreichte Freigabestufe anzeigen.
  */

  if (highlightedItems.length === 0) {
    const highestUnlockLevel =
      Math.max(
        ...availableItems.map(
          archiveItem =>
            archiveItem.level
        )
      );

    highlightedItems =
      availableItems.filter(
        archiveItem =>
          archiveItem.level ===
          highestUnlockLevel
      );

    headlineText =
      `DEINE FREIGABEN AUF LEVEL ${highestUnlockLevel}`;

    informationText =
      "ZULETZT FREIGESCHALTETE ARCHIVINHALTE:";
  }


  if (newUnlockHeadline) {
    newUnlockHeadline.textContent =
      headlineText;
  }

  if (newUnlockText) {
    newUnlockText.textContent =
      informationText;
  }


  highlightedItems.forEach(
    archiveItem => {
      newUnlockList.append(
        createHomeUnlockCard(
          archiveItem,
          true
        )
      );
    }
  );


  newUnlockPanel.hidden =
    false;


  /*
    Aktuelles Level fÃ¼r den nÃ¤chsten Besuch speichern
  */

  try {
    localStorage.setItem(
      storageKey,
      String(currentUser.level)
    );
  } catch (error) {
    console.warn(
      "M.I.N.D.: Aktuelles Level konnte nicht gespeichert werden.",
      error
    );
  }
}


    /* =====================================================
       AKTE Ã-FFNEN
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
              ðŸ”'
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

              BENÃ-TIGTER RANG:
              ${getRankName(requiredLevel)}

              <br>

              BENÃ-TIGTES LEVEL:
              ${requiredLevel}

              <br><br>

              DIESE ARCHIVAKTE WURDE
              NOCH NICHT ENTSCHLÃœSSELT.

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
              âš 
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

              PRÃœFE DEN DATEINAMEN,
              DIE ENDUNG .HTML UND
              DEN ORDNERPFAD.

            </div>

          </div>

        </div>
      `;
    }


    /* =====================================================
       KNÃ-PFE INNERHALB GELADENER SEITEN
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
              : `ZUGRIFF GESPERRT Â· LEVEL ${requiredLevel} BENÃ-TIGT`;
          }
        }
      );
    }


    /* =====================================================
       LINKES MENÃœ
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