export const registrationManager = {
	//Funkcja waliduje przekazane hasła
	//Jeżeli jest błąd, przygotowuje komunikat do wyświetlenia
	submitUser(pEmail, pPass1, pPass2) {
		//Sprawdź czy uzupełniono wszystkie pola
		if (pEmail.length === 0 || pPass1.length === 0 || pPass2.length === 0) {
			//console.log('puste pola');
			swal("Oops!", "Proszę uzupełnić wszystkie pola", "warning");
			return;
		}

		//Sprawdź czy podano prawidłowego maila
		const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegExp.test(pEmail)) {
			//console.log('puste pola');
			swal("Oops!", "Podano niepoprawny adres mailowy", "warning");
			return;
		}

		//Sprawdź czy podano takie samo hasło
		if (pPass1 !== pPass2) {
			//console.log('różne hasła');
			swal("Oops!", "Podano różne hasła", "warning");
			return;
		}

		//Sprawdź czy hasło jest przynajmniej "średnie"
		if (this.passwordStrength(pPass1) === "weak") {
			//console.log('słabe hasło');
			swal(
				"Oops!",
				"Hasło jest zbyt słabe. Hasło powinno mieć przynajmniej 8 znaków, w tym przynajmniej jedną dużą literę",
				"warning"
			);
			return;
		}

		//Sprawdź, czy adres email już istnieje w pliku JSON
		fetch("http://localhost:3000/users")
			.then((response) => response.json())
			.then((users) => {
				const existingUser = users.find((user) => user.email === pEmail);
				if (existingUser) {
					//console.log("użytkownik istnieje");
					swal("Oops!", "Użytkownik o podanym mailu już istnieje", "warning");
					return;
				}

				//Dodaj rekord do pliku JSON
				fetch("http://localhost:3000/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: pEmail,
						password: pPass1,
					}),
				})
					.then((response) => {
						if (response.ok) {
							//console.log("utworzono użytkownika");
							swal(
								"Brawo!",
								"Zarejestrowano użytkownika. Proszę się zalogować",
								"success"
							);
						} else {
							//console.log("nie udało się utworzyć użytkownika");
							swal(
								"Oops!",
								"Rejestracja użytkownika zakończona niepowodzeniem",
								"warning"
							);
						}
					})
					.catch((error) => {
						//console.log("nie udało się utworzyć użytkownika");
						swal(
							"Oops!",
							"Rejestracja użytkownika zakończona niepowodzeniem. Błąd: " +
								error,
							"warning"
						);
					});
			})
			.catch((error) => {
				//console.log("brak połączenia z bazą");
				swal(
					"Oops!",
					"Nie udało się połączyć z bazą danych użytkowników. Błąd: " + error,
					"warning"
				);
			});

		return;
	},

	//Sprawdzenie siły hasła
	passwordStrength(password) {
		let dlugosc = password.length;
		console.log("dlugość hasła " + dlugosc);
		if (dlugosc >= 12 && /[A-Z]/.test(password) && /\d/.test(password)) {
			console.log("strong");
			return "strong";
		} else if (dlugosc >= 8 && /[A-Z]/.test(password)) {
			console.log("average");
			return "average";
			//gdy hasło wyczyszczono to zwracamy pusty napis
		} else if (dlugosc == 0) {
			console.log("");
			return " ";
		} else {
			console.log("weak");
			return "weak";
		}
	},

	// Funkcja zwraca wartość siły hasła do elementu html
	checkPassword(password) {
		//console.log("Hasło wejściowo: " + password);

		const passStrength = document.getElementById("passStrText");
		passStrength.innerText = "Siła hasła: " + this.passwordStrength(password);
	},
};
