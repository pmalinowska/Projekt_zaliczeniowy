// Home.js

/*
Funkcja odpowiada za wygenerowanie strony domowej
Założeniem jest, że serwer nie obsługuje plików statycznych - zdjęcia są hostowane na serwerze zewnętrznym
*/
export function Home() {
	const divA = document.createElement("div");

	const section = document.createElement("section");
	section.setAttribute("class", "section-img");
	const div1 = document.createElement("div");
	div1.setAttribute("class", "hero-bg");

	const div2 = document.createElement("div");
	div2.setAttribute("class", "hero-text");

	div2.innerHTML = `
    <p>Witaj w IT SPA!</p>
    <p>Każdy programista lubi u nas odpoczywać.</p>
  `;

	section.append(div1, div2);

	const section2 = document.createElement("section");
	section2.classList.add("container", "my-5");
	const p = document.createElement("p");
	p.classList.add("p-3", "bg-light", "text-dark");

	p.innerHTML = `
  Nasz hotel jest wyjątkowym połączeniem miejsca, w którym można szukać zarówno "odpoczynku" od ciężkiej i żmudnej pracy w software house, jednocześnie nie tracąc z życia codziennego wrażeń płynących z nieskrępowanego obcowania z technologią komputerową.
  Oferujemy Państwu ekskluzywny hotel, do którego wstęp mają tylko nieliczni. Tylko u nas, aby przejść proces zakwaterowania, należy wykazać się zdolnościami takimi jak stworzenie w 2 minuty <i>wydajnego</i> zapytania SQL zwracającego choinkę świąteczną, napisanie kodu w COBOL czy wytłumaczenie, co robi 5 losowo wybranych linii kodu w Assemblerze. Gwarantujemy tym samym elitarnosć naszych gości. 
  <br>
  <br>
  Zapewniamy wyżywienie - dietę pudełkową od nieznanego producenta paszy, wspaniałą obsługę, która nie odbiera telefonów, a na każde Państwa życzenia odpowie, że "u mnie działa". W standardzie do każdego pokoju zapewniamy domeldowanego irytującego użytkownika, który będzie zgłaszał Państwu same pilne zgłoszenia. Za dodatkową dopłatą możliwe jest dodanie opcji "same zgłoszenia krytyczne, od których firma się zawali", a także opcje dodatkowe "dlaczego ta drukarka nie działa" czy "coś mi tu na ekranie się kliknęło". Pełna oferta dostępna poprzez usługę SOAP - adres do WSDL należy odgadnąć samodzielnie poprzez odszukanie wszystkich maili wydrukowanych i rozlokowanych na terenie hotelu.
  <br>
  <br>
  Jednocześnie zastrzegamy, że pokój w kategorii Deluxe jest dostępny jedynie dla osoby, który będzie w stanie napisać  w języku Malbolge program Hello World.
  <br>
  <br>
  Zachęcamy do zapoznania się z naszą ofertą - nie możemy się doczekać, aby Państwa ugościć!
  `;

	const cardContainer = document.createElement("div");
	cardContainer.setAttribute("class", "container");

	const cardRow = document.createElement("div");
	cardRow.setAttribute("class", "row justify-content-center");

	const cardCol1 = document.createElement("div");
	cardCol1.setAttribute("class", "col-md-4");

	const card1 = document.createElement("div");
	card1.setAttribute("class", "card");

	const cardImg1 = document.createElement("img");
	cardImg1.setAttribute("src", "https://i.ibb.co/SK2RZ7T/location.jpg");
	cardImg1.setAttribute("class", "card-img-top");

	const cardBody1 = document.createElement("div");
	cardBody1.setAttribute("class", "card-body");

	const cardTitle1 = document.createElement("h5");
	cardTitle1.setAttribute("class", "card-title");
	cardTitle1.innerText = "Lokalizacja";

	const cardText1 = document.createElement("p");
	cardText1.setAttribute("class", "card-text");
	cardText1.innerText = "Z dala od wifi, u nas tylko praca zdalna na stałym łączu";

	cardBody1.append(cardTitle1, cardText1);
	card1.append(cardImg1, cardBody1);
	cardCol1.appendChild(card1);

	const cardCol2 = document.createElement("div");
	cardCol2.setAttribute("class", "col-md-4");

	const card2 = document.createElement("div");
	card2.setAttribute("class", "card");

	const cardImg2 = document.createElement("img");
	cardImg2.setAttribute("src", "https://i.ibb.co/0jQ1btS/treatment.jpg");
	cardImg2.setAttribute("class", "card-img-top");

	const cardBody2 = document.createElement("div");
	cardBody2.setAttribute("class", "card-body");

	const cardTitle2 = document.createElement("h5");
	cardTitle2.setAttribute("class", "card-title");
	cardTitle2.innerText = "Unikatowe zabiegi";

	const cardText2 = document.createElement("p");
	cardText2.setAttribute("class", "card-text");
	cardText2.innerText = "Zabiegi, po których znowu poczujesz się jak junior developer";

	cardBody2.append(cardTitle2, cardText2);
	card2.append(cardImg2, cardBody2);
	cardCol2.appendChild(card2);

	const cardCol3 = document.createElement("div");
	cardCol3.setAttribute("class", "col-md-4");

	const card3 = document.createElement("div");
	card3.setAttribute("class", "card");

	const cardImg3 = document.createElement("img");
	cardImg3.setAttribute("src", "https://i.ibb.co/Wz5knct/geek.jpg");
	cardImg3.setAttribute("class", "card-img-top");

	const cardBody3 = document.createElement("div");
	cardBody3.setAttribute("class", "card-body");

	const cardTitle3 = document.createElement("h5");
	cardTitle3.setAttribute("class", "card-title");
	cardTitle3.innerText = "Hermetyczne  nerdowskie środowisko";

	const cardText3 = document.createElement("p");
	cardText3.setAttribute("class", "card-text");
	cardText3.innerText = "Brak dress code, obsługa serwuje tylko i wyłącznie w koszulach w kratkę i trampkach";



	cardBody3.append(cardTitle3, cardText3);
	card3.append(cardImg3, cardBody3);
	cardCol3.appendChild(card3);

	cardRow.append(cardCol1, cardCol2, cardCol3);
	cardContainer.appendChild(cardRow);

	section2.append(p, cardContainer);

	divA.append(section, section2);

	return divA;
}
