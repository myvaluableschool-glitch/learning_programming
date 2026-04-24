// PAGE ACCUEIL
if(document.getElementById("courses")){
fetch('courses.json')
.then(res => res.json())
.then(data => {
  const container = document.getElementById("courses");

  data.forEach(c => {
    container.innerHTML += `
      <div class="card">
        <img src="${c.image}">
        <div class="card-content">
          <h3>${c.title}</h3>
          <p>${c.level}</p>
          <p><strong>${c.price}</strong></p>
          <a href="course.html?id=${c.id}" class="btn">Voir</a>
        </div>
      </div>
    `;
  });
});
}

// PAGE COURS
if(window.location.pathname.includes("course.html")){
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch('courses.json')
.then(res => res.json())
.then(data => {
  const c = data.find(x => x.id == id);

  document.body.innerHTML += `
    <div class="container">
      <h1>${c.title}</h1>
      <iframe class="video" height="400" src="${c.video}"></iframe>
      <p>Niveau : ${c.level}</p>
      <button class="btn">Acheter ${c.price}</button>
    </div>
  `;
});
}