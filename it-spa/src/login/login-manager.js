const key = "it-spa-login";

export const loginManager = {
	//Obsługa logowania - najpierw wykonuje walidacje, następnie dokonuje logowanie
	checkLogin(pEmail, pPassword) {
		let content;

		//Podstawowe walidacje - czy podano pełne dane logowania
		if (pEmail.length === 0 || pPassword.lenght === 0) {
			console.log("puste pola przy logowaniu");
			swal("Oops!", "Proszę uzupełnić wszystkie pola", "warning");
			return;
		}

		// Na sztywno wartośc klucza 1 - tak by było możliwe zalogowanie tylko jednego użytkownika na raz i zawsze tylko jeden wpis dla tego klucza
		const itemKey = 1;

		// Sprawdź czy user znajduje się już w bazie zarejestrowanych użytkowników
		fetch("http://localhost:3000/users")
			.then((response) => response.json())
			.then((users) => {
				const existingUser = users.find((user) => user.email === pEmail);
				const existingPassword = users.find(
					(user) => user.password === pPassword
				);
				if (!existingUser || !existingPassword) {
					console.error("Wrong user or password");
					swal("Oops!", "Niepoprawny użytkownik lub hasło", "warning");
					return;
				}

				const loginEntry = localStorage.getItem(key);
				const currentDate = new Date();

				if (loginEntry === null) {
					content = {
						[itemKey]: {
							user: pEmail,
							password: pPassword,
							date: currentDate,
						},
					};

					console.log("Dodaję klucz zalogowania");
					localStorage.setItem(key, JSON.stringify(content));
					swal({
						title: "Brawo!",
						text: "Zalogowano użytkownika",
						icon: "success",
					}).then(() => {
						location.reload();
					});
				} else {
					swal("Oops!", "Jesteś już zalogowany", "warning");
				}
			});
	},

	// Obsługa wylogowania użytkownika - usuwa wpis z localStorage
	logoutUser() {
		localStorage.removeItem(key);
		location.reload();
	},
};
