// PAGE COURS
if (window.location.pathname.includes("course.html")) {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch('courses.json')
    .then(res => res.json())
    .then(data => {

      const c = data.find(x => x.id == id);

      if (!c) {
        document.getElementById("course-container").innerHTML = "<p>Cours introuvable</p>";
        return;
      }

      let chaptersHTML = "";

      c.chapters.forEach((ch, index) => {

        let resourcesHTML = "";

        ch.resources.forEach(r => {
          resourcesHTML += `<li><a href="${r}" download>${r.split('/').pop()}</a></li>`;
        });

        chaptersHTML += `
          <div class="chapter">
            <h3>${index + 1}. ${ch.title}</h3>

            <iframe class="video" src="${ch.video}" frameborder="0" allowfullscreen></iframe>

            <h4>Ressources :</h4>
            <ul>
              ${resourcesHTML}
            </ul>
          </div>
        `;
      });

      document.getElementById("course-container").innerHTML = `
        <h1>${c.title}</h1>

        <img src="${c.image}" alt="${c.title}" style="width:100%; max-width:600px; margin-bottom:20px;">

        <p><strong>Niveau :</strong> ${c.level}</p>

        <h2>Vidéo d'introduction</h2>
        <iframe class="video" src="${c.introVideo}" frameborder="0" allowfullscreen></iframe>

        <h2>Chapitres</h2>
        ${chaptersHTML}

        <a href="index.html" class="btn">Retour</a>
      `;
    });
}
