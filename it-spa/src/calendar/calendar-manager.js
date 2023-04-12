// calendar-manager.js

export const calendarManager = {
	//Funkcja waliduje przekazane daty
	//Jeżeli jest błąd, przygotowuje komunikat do wyświetlenia, wyświetlamy pierwszy napotkany komunikat (od razu return)
	validateDates(pDateFrom, pDateTo, pDiffDays) {
		//Sprawdź czy obydwie daty są uzupełnione
		if (pDateFrom.length === 0 || pDateTo.length === 0) {
			return "Należy uzupełnić obydwie daty";
		}

		//Sprawdź czy data do jest większa od daty od
		if (pDateFrom >= pDateTo) {
			return "Data od musi być mniejsza od daty do";
		}

        //żeby porównać datę "Od" z datą dzisiejszą konwertujemy parametr (string) do daty
        //żeby dobrze porównać daty z datą pobieraną z formualrza, obcinamy datę do godziny do godziny 00:00:00
		const pDateFromD = Date.parse(pDateFrom);
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); 

		if (pDateFromD < currentDate) {
			return "Data od nie może być wcześniejsza od daty bieżącej";
		}

        // sprawdzamy czy długość pobytu nie przekracza 365 dni
		if (pDiffDays > 365) {
			return "Przekroczono maksymalną długość pobytu";
		}

		//jeżeli wszystkie walidacje są poprawne i kod doszedł do tego miejsca, to zwracamy pusty string
		return "";
	},
};
