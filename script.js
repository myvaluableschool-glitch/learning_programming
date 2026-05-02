// PAGE COURS
if (window.location.pathname.includes("course.html")) {

  const container = document.getElementById("course-container");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch('courses.json')
    .then(res => res.json())
    .then(data => {

      const c = data.find(x => x.id == id);

      if (!c) {
        container.innerHTML = "<p>Cours introuvable</p>";
        return;
      }

      let chaptersHTML = "";

      if (c.chapters && c.chapters.length > 0) {

        c.chapters.forEach((ch, index) => {

          let resourcesHTML = "";

          if (ch.resources && ch.resources.length > 0) {
            ch.resources.forEach(r => {
              resourcesHTML += `<li><a href="${r}" download>${r.split('/').pop()}</a></li>`;
            });
          } else {
            resourcesHTML = "<li>Aucune ressource</li>";
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
        chaptersHTML = "<p>Aucun chapitre disponible</p>";
      }

      container.innerHTML = `
        <h1>${c.title}</h1>

        <img src="${c.image}" style="width:100%; max-width:600px;">

        <p><strong>Niveau :</strong> ${c.level}</p>

        <h2>Vidéo d'introduction</h2>
        <iframe class="video" src="${c.introVideo || ''}" frameborder="0"></iframe>

        <h2>Chapitres</h2>
        <div class="chapters-grid">
          ${chaptersHTML}
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Erreur de chargement</p>";
    });
}
