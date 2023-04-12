// Nav.js

import { NavButton } from "../common/NavButton";
import { Cart } from "../views/Cart";
import { Home } from "../views/Home";
import { RoomList } from "../views/RoomList";
import { Treatments } from "../views/Treatments";
import { Registration } from "../views/Registration";
import { Login } from "../views/Login";
import { loginManager } from "../login/login-manager";

const key = "it-spa-login";

const navItems = [
	{ name: "Home", component: Home },
	{ name: "Pokoje", component: RoomList },
	{ name: "Zabiegi", component: Treatments },
	{ name: "🛒", component: Cart },
	{ name: "Rejestracja", component: Registration },
	{ name: "Logowanie", component: Login },
];

// Funkcja obsługuje wyświetlanie menu nawigacji
export function Nav() {
	const nav = document.createElement("nav");
	nav.setAttribute(
		"class",
		"navbar navbar-expand-lg navbar-light bg-light fixed-top"
	);

	const navBrand = document.createElement("a");
	navBrand.setAttribute("class", "navbar-brand");
	navBrand.setAttribute("href", "/");

	const spaIcon = document.createElement("i");
	spaIcon.setAttribute("class", "fa-solid fa-spa");

	navBrand.appendChild(spaIcon);
	navBrand.innerHTML += " IT Spa";

	const navbarToggler = document.createElement("button");
	navbarToggler.setAttribute("class", "navbar-toggler");
	navbarToggler.setAttribute("type", "button");
	navbarToggler.setAttribute("data-bs-toggle", "collapse");
	navbarToggler.setAttribute("data-bs-target", "#navbarNav");
	navbarToggler.setAttribute("aria-controls", "navbarNav");
	navbarToggler.setAttribute("aria-expanded", "false");
	navbarToggler.setAttribute("aria-label", "Toggle navigation");

	const navbarTogglerIcon = document.createElement("span");
	navbarTogglerIcon.setAttribute("class", "navbar-toggler-icon");

	navbarToggler.appendChild(navbarTogglerIcon);

	const navbarNav = document.createElement("div");
	navbarNav.setAttribute("class", "collapse navbar-collapse");
	navbarNav.setAttribute("id", "navbarNav");

	const navLinks = document.createElement("ul");
	navLinks.setAttribute("class", "navbar-nav me-auto mb-2 mb-lg-0");

	const navButtons = navItems.map((navItem) => {
		const navLink = document.createElement("li");
		navLink.setAttribute("class", "nav-item");
		navLink.appendChild(
			NavButton(navItem.name, navItem.component, ["btn", "nav-link"])
		);
		return navLink;
	});

	navLinks.append(...navButtons);

	const loginNav = document.createElement("div");
	loginNav.setAttribute("id", "login-nav");

	//Dodanie przycisku Wyloguj
	const logoutButton = document.createElement("button");
	logoutButton.innerText = "Wyloguj";
	logoutButton.classList.add("btn", "nav-link");

	logoutButton.addEventListener("click", loginManager.logoutUser);

	const loginEntry = localStorage.getItem(key);

	//Obsługa sekcji Zalogowano jako
	if (loginEntry !== null) {
		// Wyczytaj z LocalStorage jaki to user
		const parsedLoginEntry = JSON.parse(loginEntry);
		const userName = parsedLoginEntry["1"].user;

		// Dodaj sekcję, że zalogowano jako ten użytkownik i usuń przycisk "Wyloguj"
		loginNav.innerHTML = `Zalogowano jako: ${userName}`;
	} else {
		loginNav.innerHTML = "";
		logoutButton.style.display = "none";
	}

	//Połączenie elementów
	navbarNav.append(navLinks, loginNav, logoutButton);
	nav.append(navBrand, navbarToggler, navbarNav);

	//Obsługa menu hamburgera
	const hamburgerMenu = () => {
		navbarToggler.addEventListener("click", function () {
			navbarToggler.classList.toggle("collapsed");
			navbarNav.classList.toggle("show");
			document.body.classList.toggle("hamburger-collapsed");
		});
	};

	hamburgerMenu();

	return nav;
}
