// NavButton.js

// Funkcja obsługuje stworzenie przycisków nawigacji
export function NavButton(text, componentFn, classes = []) {
	const button = document.createElement("button");
	button.setAttribute("type", "button");
	button.classList.add(...classes);
	button.innerText = text;

	button.addEventListener("click", () => {
		const navigationEvent = new CustomEvent("navigate", {
			detail: componentFn,
		});

		document.body.dispatchEvent(navigationEvent);
	});

	return button;
}
