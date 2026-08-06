/* =====================================================
   HANDY: ZUVERLÄSSIG ZUM INHALTSBEREICH SPRINGEN
===================================================== */

function scrollToContentOnMobile() {
  if (
    !window.matchMedia("(max-width: 960px)").matches ||
    !contentArea
  ) {
    return;
  }

  const performScroll = () => {
    const contentPosition =
      contentArea.getBoundingClientRect().top +
      window.scrollY -
      16;

    window.scrollTo({
      top: contentPosition,
      behavior: "auto"
    });
  };

  /*
    Doppelte requestAnimationFrame-Abfrage:
    Der Browser darf den neuen Artikel zuerst aufbauen.
  */
  requestAnimationFrame(() => {
    requestAnimationFrame(performScroll);
  });

  /*
    Sicherheitswiederholungen für langsamere Handys
    und nachträglich geladene Schriften oder Bilder.
  */
  setTimeout(performScroll, 150);
  setTimeout(performScroll, 400);
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

    /* Erst nach dem Laden zum Artikel springen */
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