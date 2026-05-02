// =========================
// TRADUCTIONS
// =========================
const translations = {
  fr: {
    voir: "Voir le cours",
    niveau: "Niveau",
    intro: "Vidéo d'introduction",
    chapitres: "Chapitres",
    aucunChapitre: "Aucun chapitre disponible",
    erreur: "Erreur de chargement",
    introuvable: "Cours introuvable",
    aucuneRessource: "Aucune ressource"
  },
  en: {
    voir: "View course",
    niveau: "Level",
    intro: "Introduction video",
    chapitres: "Chapters",
    aucunChapitre: "No chapters available",
    erreur: "Loading error",
    introuvable: "Course not found",
    aucuneRessource: "No resources"
  },
  ar: {
    voir: "عرض الدورة",
    niveau: "المستوى",
    intro: "فيديو تمهيدي",
    chapitres: "الفصول",
    aucunChapitre: "لا توجد فصول",
    erreur: "خطأ في التحميل",
    introuvable: "الدورة غير موجودة",
    aucuneRessource: "لا توجد موارد"
  }
};

// =========================
// GESTION LANGUE
// =========================
const langSelect = document.getElementById("lang");
let currentLang = localStorage.getItem("lang") || "fr";

function applyLanguage(lang) {
  currentLang = lang;

  // texte HTML (data-i18n)
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // RTL arabe
  document.body.dir = (lang === "ar") ? "rtl" : "ltr";

  localStorage.setItem("lang", lang);
}

// initialisation langue
if (langSelect) {
  langSelect.value = currentLang;
  applyLanguage(currentLang);

  langSelect.addEventListener("change", e => {
    applyLanguage(e.target.value);
  });
}


// =========================
// PAGE ACCUEIL
// =========================
if (document.getElementById("courses")) {

  fetch('./courses.json')
    .then(res => res.json())
    .then(data => {

      const container = document.getElementById("courses");

      data.forEach(c => {
        container.innerHTML += `
          <a href="course.html?id=${c.id}" class="card">
            <img src="${c.image}" alt="${c.title}">
            <div class="card-content">
              <h3>${c.title}</h3>
              <p>${c.level}</p>
              <span class="btn">${translations[currentLang].voir}</span>
            </div>
          </a>
        `;
      });

    })
    .catch(err => console.error(err));
}


// =========================
// PAGE COURS
// =========================
if (window.location.pathname.includes("course.html")) {

  const container = document.getElementById("course-container");

  if (!container) {
    console.log("container introuvable");
  } else {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch('./courses.json')
      .then(res => res.json())
      .then(data => {

        const c = data.find(x => x.id == id);

        if (!c) {
          container.innerHTML = `<p>${translations[currentLang].introuvable}</p>`;
          return;
        }

        let chaptersHTML = "";

        if (c.chapters && c.chapters.length > 0) {

          c.chapters.forEach((ch, index) => {

            let resourcesHTML = "";

            if (ch.resources && ch.resources.length > 0) {
              ch.resources.forEach(r => {
                resourcesHTML += `
                  <li>
                    <a href="${r}" download>
                      ${r.split('/').pop()}
                    </a>
                  </li>
                `;
              });
            } else {
              resourcesHTML = `<li>${translations[currentLang].aucuneRessource}</li>`;
            }

            chaptersHTML += `
              <div class="chapter">
                <h3>${index + 1}. ${ch.title}</h3>

                <div class="chapter-video">
                  <iframe src="${ch.video}" frameborder="0" allowfullscreen></iframe>
                </div>

                <ul>${resourcesHTML}</ul>
              </div>
            `;
          });

        } else {
          chaptersHTML = `<p>${translations[currentLang].aucunChapitre}</p>`;
        }

        container.innerHTML = `
          <h1>${c.title}</h1>

          <img src="${c.image}" style="width:100%; max-width:600px; border-radius:12px;">

          <p><strong>${translations[currentLang].niveau} :</strong> ${c.level}</p>

          <h2>${translations[currentLang].intro}</h2>
          <iframe class="video" src="${c.introVideo || ''}" frameborder="0"></iframe>

          <h2>${translations[currentLang].chapitres}</h2>
          <div class="chapters-grid">
            ${chaptersHTML}
          </div>
        `;
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = `<p>${translations[currentLang].erreur}</p>`;
      });

  }
}
