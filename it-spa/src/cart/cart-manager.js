// cart-manager.js
import swal from "sweetalert";
import { calendarManager } from "../calendar/calendar-manager";

const key = "it-spa-cart";

export const cartManager = {
	/* Obsługa dodawania elementu do koszyka
		Parametry: 
			item - obiekt z zawartością dodawanego elementu,
			dates - parametr tekstowy informujacy czy dodajemy element z datą czy nie:
				=> pokoje dodajemy z informacją o dacie pobytu (yes)
				=> zabiegi dodajemy bez informacji o datach (no) */
	addItem(item, dates) {
		const cart = localStorage.getItem(key);
		let content;

		let selectedDateFrom = "";
		let selectedDateTo = "";
		let itemKey = "";
		let selectedDateFromD = "";
		let selectedDateToD = "";
		let diffSecs = "";
		let diffDays = "";

		/* 
		Jeżeli przekazywane są daty pobytu to pobierz je poprzez id (id = kombinacja id elementu i id itemu)
		Tworzymy także unikatowy klucz do zapisania w localstorage (unikalność dla pokojów jest określona jako: id itemu oraz daty)
		Wyliczamy także różnicę dni pobytu
		*/
		if (dates === "yes") {
			selectedDateFrom = document.getElementById("dateFrom" + item.id).value;
			selectedDateTo = document.getElementById("dateTo" + item.id).value;
			itemKey = item.id + "_" + selectedDateFrom + "_" + selectedDateTo;

			selectedDateFromD = Date.parse(selectedDateFrom);
			selectedDateToD = Date.parse(selectedDateTo);

			diffSecs = Math.abs(selectedDateToD - selectedDateFromD);
			diffDays = diffSecs / (1000 * 60 * 60 * 24); // 1000 ms * 60 s * 60 min * 24 h

			/*
			Uruchomienie walidacji przekazanych dat
			Tekst ew. komunikatu wrzucam do zmiennej: datesValidator
			*/
			const datesValidator = calendarManager.validateDates(
				selectedDateFrom,
				selectedDateTo,
				diffDays
			);

			//Jeżeli walidacja dat zwróciła komunikat, to wyświetlamy go i kończymy działanie
			if (datesValidator.length > 0) {
				swal("Oops!", datesValidator, "warning");
				return false;
			}
		}
		// Gdy daty pobytu nie są przekazywane to unikatowy klucz to po prostu id itemu
		else {
			itemKey = item.id;
		}

		// Gdy koszyk pusty, utwórz rekord do zapisu w localstorage
		if (cart === null) {
			content = {
				[itemKey]: {
					name: item.name,
					price: item.price,
					quantity: 1,
					dateFrom: selectedDateFrom,
					dateTo: selectedDateTo,
					days: diffDays,
				},
			};
		} 
		// Jeżeli koszyk nie jest pusty to zbadamy czy dany klucz jest już w localstorage
		else {
			content = JSON.parse(cart);
			//Jeżeli klucz jest w localstorage to tylko zwiększamy liczbę dodaną do koszyka
			if (itemKey in content) {
				content[itemKey].quantity += 1;
			} 
			//Jeżeli klucza nie ma to przygotowujemy nowy rekord do dodania
			else {
				const newItem = {
					[itemKey]: {
						name: item.name,
						price: item.price,
						quantity: 1,
						dateFrom: selectedDateFrom,
						dateTo: selectedDateTo,
						days: diffDays,
					},
				};

				// Doklada nowy wpis (klucz: wartosc) do obiektu `content`
				Object.assign(content, newItem);
			}
		}

		//Zapis w localstorage i komunikat sukcesu
		localStorage.setItem(key, JSON.stringify(content));
		swal("Brawo!", "Dodano do koszyka", "success");
	},

	
	//Usuwanie element z koszyka
	removeItem(item) {
		const cart = localStorage.getItem(key);

		if (cart !== null) {
			const content = JSON.parse(cart);

			if (item.id in content) {
				if (content[item.id].quantity > 1) {
					content[item.id].quantity -= 1;
				} else {
					delete content[item.id];
				}
			}

			localStorage.setItem(key, JSON.stringify(content));
		}
	},

	//Pobieranie zawartości z localstorage dla koszyka
	getAllItems() {
		const cart = localStorage.getItem(key);

		if (cart === null) {
			return [];
		} else {
			const content = JSON.parse(cart);

			// entry to jest [KLUCZ, WARTOSC]
			return Object.entries(content).map((entry) => {
				const [itemId, itemDetails] = entry;

				return {
					id: itemId,
					name: itemDetails.name,
					price: itemDetails.price,
					quantity: itemDetails.quantity,
					dateFrom: itemDetails.dateFrom,
					dateTo: itemDetails.dateTo,
					days: itemDetails.days,
				};
			});
		}
	},

	/*
	Wyliczenie łącznej wartości (ceny) koszyka
	Cena to:
		* dla zabiegów: liczba zabiegów * cena jednostkowa
		* dla pokoi: liczba pokoi * cena za dobę * liczba dni pobytu
	*/
	getTotalPrice() {
		const cart = localStorage.getItem(key);

		if (cart === null) {
			return "0.00";
		} else {
			const content = JSON.parse(cart);

			return Object.values(content)
				.reduce((totalPrice, item) => {
					return totalPrice + item.price * item.quantity * (item.days || 1);
				}, 0)
				.toFixed(2);
		}
	},
};
