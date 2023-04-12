// Login.js

import { loginManager } from "../login/login-manager.js";

// Funkcja odpowiada za wygenerowanie strony logowania
export function Login() {
	const section = document.createElement("section");
	const form = document.createElement("form");
	form.classList.add("p-4", "bg-light", "rounded", "shadow", "col-lg-4");

	const emailFormGroup = document.createElement("div");
	emailFormGroup.classList.add("form-group");

	const eMail = document.createElement("input");
	eMail.classList.add("form-control");
	eMail.setAttribute("type", "email");
	eMail.setAttribute("id", "emailL");
	eMail.setAttribute("required", "");

	const eMailLabel = document.createElement("label");
	eMailLabel.textContent = "Adres email";
	eMailLabel.setAttribute("for", "emailL");

	emailFormGroup.append(eMailLabel, eMail);

	const passwordFormGroup = document.createElement("div");
	passwordFormGroup.classList.add("form-group");

	const password = document.createElement("input");
	password.classList.add("form-control");
	password.setAttribute("type", "password");
	password.setAttribute("id", "passwordL");
	password.setAttribute("required", "");

	const passLabel = document.createElement("label");
	passLabel.textContent = "Hasło";
	passLabel.setAttribute("for", "passwordL");

	passwordFormGroup.append(passLabel, password);

	const loginButton = document.createElement("button");
	loginButton.innerText = "Logowanie";
	loginButton.classList.add("btn", "btn-primary", "mt-3");

	loginButton.addEventListener("click", (event) => {
		event.preventDefault();
		loginManager.checkLogin(eMail.value, password.value);
	});

	const formRow = document.createElement("div");
	formRow.classList.add("form-row");
	formRow.append(emailFormGroup, passwordFormGroup);

	form.append(formRow, loginButton);

	return form;
}
