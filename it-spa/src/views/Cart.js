// Cart.js

import { cartManager } from "../cart/cart-manager";
import { NavButton } from "../common/NavButton";

//Funckja odpowiada za wygenerowanie strony koszyka
export function Cart() {
	const section = document.createElement("section");
	section.innerHTML = `
    <div class="container">
      <h2 class="text-center">Koszyk programisty</h2>
      <p class="text-center">Przeglądaj zawartość koszyka:</p>
      <div class="row">
        <div class="col-9 mx-auto">
          <table class="table table-striped table-hover"></table>
        </div>
      </div>
    </div>
  `;

	const tableHead = document.createElement("thead");
	tableHead.innerHTML = `
    <tr class="bg-secondary text-blue">
      <th>Pozycja</th>
      <th>Ilość</th>
      <th>Cena jednostkowa</th>
      <th>Data od</th>
      <th>Data do</th>
      <th>Liczba dni</th>
      <th></th>
    </tr>
  `;

	const tableRows = cartManager.getAllItems().map((item) => {
		const tr = document.createElement("tr");

		const removeItem = NavButton(
			"🗑️",
			() => {
				cartManager.removeItem(item);
				return Cart();
			},
			["btn"]
		);

		tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)} PLN</td>
      <td>${item.dateFrom}</td>
      <td>${item.dateTo}</td>
      <td>${item.days}</td>
      <td></td>
    `;

		tr.lastElementChild.append(removeItem);

		return tr;
	});

	const tableFooter = document.createElement("tfoot");
	tableFooter.innerHTML = `
    <tr>
      <td></td>
      <td></td>
      <td>
        Razem = <strong>${cartManager.getTotalPrice()}</strong> PLN
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `;

	const table = section.querySelector(".table");
	table.append(tableHead);

	const tbody = document.createElement("tbody");
	tbody.append(...tableRows);
	table.append(tbody);

	table.append(tableFooter);

	return section;
}
