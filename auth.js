function book(e){
  e.preventDefault();

  const data = {
    type: document.getElementById("type").value,
    date: document.getElementById("date").value
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(data);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Réservation confirmée");
}