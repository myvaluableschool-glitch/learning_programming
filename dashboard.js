function markDone(id){
  let progress = JSON.parse(localStorage.getItem("progress")) || [];
  progress.push(id);
  localStorage.setItem("progress", JSON.stringify(progress));
}