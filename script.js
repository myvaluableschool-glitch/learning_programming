// PAGE ACCUEIL
if (document.getElementById("courses")) {
  fetch('courses.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("courses");

      data.forEach(c => {
        container.innerHTML += `
          <div class="card">
            <img src="${c.image}" alt="${c.title}">
            <div class="card-content">
              <h3>${c.title}</h3>
              <p>${c.level}</p>
              <a href="course.html?id=${c.id}" class="btn">Voir le cours</a>
            </div>
          </div>
        `;
      });
    });
}

// PAGE COURS
if (window.location.pathname.includes("course.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch('courses.json')
    .then(res => res.json())
    .then(data => {
      const c = data.find(x => x.id == id);

      document.getElementById("course-container").innerHTML = `
        <div class="container">
          <h1>${c.title}</h1>

          <img src="${c.image}" alt="${c.title}" style="width:100%; max-width:600px; margin-bottom:20px;">

          <iframe class="video" height="400" src="${c.video}" 
            frameborder="0" allowfullscreen></iframe>

          <p><strong>Niveau :</strong> ${c.level}</p>

          <p>
            Cette leçon fait partie de la formation complète en langage C.
            Continuez les exercices pratiques pour progresser rapidement.
          </p>

          <a href="index.html" class="btn">Retour</a>
        </div>
      `;
    });
}
