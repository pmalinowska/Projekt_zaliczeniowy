// RoomDetails.js

//Funkcja odpowiada za wygenerowanie strony ze szczegółami pokojów
export function RoomDetails(roomId) {
  const container = document.createElement("div");
  container.classList.add("container");

  const section = document.createElement("section");

  section.innerHTML = `
    <h2>Nasze pokoje</h2>
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;

  // pobieramy wybrany pokoj z serwera
  fetch(`http://localhost:3000/rooms/${roomId}`)
    .then((response) => response.json())
    .then((room) => {
      const details = document.createElement("article");

      //serwer nie obsługuje plików statycznych, dlatego zdjęcia zostały udostępnione na stronie www 
      details.innerHTML = `
          <h3 class="my-4">${room.name}</h3>
          <div class="row">
            <div class="col-md-6 mb-3">
              <p class="h6">Liczba łóżek:</p>
              <p>${room.beds}</p>
            </div>
            <div class="col-md-6 mb-3">
              <p class="h6">Liczba gości:</p>
              <p>${room.guests}</p>
            </div>
          </div>
          <div class="mb-4">
            <img src="${room.photo}" alt="${room.name}" class="img-fluid">
          </div>
          <p>${room.description}</p>
          <p class="h4 my-4">
            <strong>${room.price.toFixed(2)} PLN</strong>
          </p>
        `;

      // usuwamy element mowiacy o ladowaniu
      section.querySelector(".spinner-border").remove();
      // podstawiamy gotowa liste z pokojami
      section.append(details);
    });

  container.appendChild(section);
  container.classList.add("mx-auto");

  return container;
}
