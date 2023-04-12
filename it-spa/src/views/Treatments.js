// Treatments.js

import { cartManager } from "../cart/cart-manager";

// Funkcja odpowiada za wygenerowanie strony z listą zabiegów
export function Treatments() {
	const section = document.createElement("section");
	const ul = document.createElement("ul");
	ul.classList.add("list-unstyled", "row", "row-cols-md-2", "g-4");

	section.innerHTML = `
  <h2 class="text-center">Nasze zabiegi dla informatyków</h2>
  <p class="lead text-center">Sprawdź ofertę zabiegów po których nie odróżnisz CS od CSS i Javy od Java Scriptu</p>
    <p class="loading">Ładuję listę zabiegów...</p>
  `;

	// pobieramy liste zabiegów z serwera
	fetch("http://localhost:3000/treatments")
		.then((response) => response.json())
		.then((treatments) => {
			const lis = treatments.map((treatment) => {
				const li = document.createElement("li");
				li.classList.add("col-md-6");

          li.innerHTML = `
          <div class="card border-0 shadow mx-4">
            <div class="row g-0">
              <div class="col-md-4">
                <div class="ratio ratio-1x1">
                <div class="bg-secondary rounded" style="background-image: url('${treatment.photo}'); background-size: cover; background-position: center;"></div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h4 class="card-title">${treatment.name}</h4>
                  <p>Opis: ${treatment.shortdescription}</p>
                  <p>Czas trwania: ${treatment.time} minut</p>
                  <p class="card-text"><strong class="text-primary">${treatment.price.toFixed(2)} PLN</strong></p>
                </div>
                <div class="card-footer border-0 bg-transparent d-flex justify-content-center">
                  <button class="btn btn-primary w-75" type="button">Dodaj do koszyka</button>
                </div>
              </div>
            </div>
          </div>
        `;
        

				const addToCartButton = li.querySelector("button");
        // Zabiegi dodajemy bez parametrów daty (parametr dates = no)
				addToCartButton.addEventListener("click", () =>
					cartManager.addItem(treatment, "no")
				);

				return li;
			});

			ul.append(...lis);

			// usuwamy element mowiacy o ladowaniu
			section.querySelector(".loading").remove();
			// podstawiamy gotowa liste z pokojami
			section.append(ul);
		});

	return section;
}

