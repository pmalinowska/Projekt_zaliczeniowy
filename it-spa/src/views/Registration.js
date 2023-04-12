// Registration.js

import { registrationManager } from "../registration/registration-manager";

// Funkcja odpowiada za wygenerowanie strony rejestracji
export function Registration() {
	const section = document.createElement("section");
	const form = document.createElement("form");
	form.classList.add("p-3", "shadow", "col-lg-4");

	const eMail = document.createElement("input");
	eMail.setAttribute("type", "email");
	eMail.setAttribute("id", "email");
	eMail.setAttribute("required", "");
	eMail.classList.add("form-control", "mb-3");

	const eMailLabel = document.createElement("label");
	eMailLabel.textContent = "Adres email";
	eMailLabel.setAttribute("for", "email");

	const password = document.createElement("input");
	password.setAttribute("type", "password");
	password.setAttribute("id", "password");
	password.setAttribute("required", "");
	password.classList.add("form-control", "mb-3");

	const passLabel = document.createElement("label");
	passLabel.textContent = "Hasło";
	passLabel.setAttribute("for", "password");

	const passConfirmation = document.createElement("input");
	passConfirmation.setAttribute("type", "password");
	passConfirmation.setAttribute("id", "password-confirmation");
	passConfirmation.setAttribute("required", "");
	passConfirmation.classList.add("form-control", "mb-3");

	const passConfLabel = document.createElement("label");
	passConfLabel.textContent = "Potwierdź hasło";
	passConfLabel.setAttribute("for", "password-confirmation");

	// Siła hasła
	const passStrength = document.createElement("div");
	passStrength.setAttribute("id", "passStrText");
	passStrength.innerText = `Siła hasła: `;

	// Przesłanie danych do rejestracji
	const submitButton = document.createElement("button");
	submitButton.innerText = "Prześlij";
	submitButton.classList.add("btn", "btn-primary");

	submitButton.addEventListener("click", (event) => {
		event.preventDefault();
		registrationManager.submitUser(
			eMail.value,
			password.value,
			passConfirmation.value
		);
	});

	form.append(
		eMailLabel,
		eMail,
		passLabel,
		password,
		passConfLabel,
		passConfirmation,
		passStrength,
		submitButton
	);

	password.addEventListener("input", function (event) {
		event.preventDefault;
		registrationManager.checkPassword(password.value);
	});

	return form;
}
