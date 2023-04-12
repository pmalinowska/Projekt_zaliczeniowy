// RoomList.js

import { RoomDetails } from './RoomDetails';
import { NavButton } from '../common/NavButton';
import { cartManager } from '../cart/cart-manager';

// Funkcja odpowiada za wygenerowanie strony z listą pokoi
export function RoomList() {

  const section = document.createElement('section');
  section.classList.add('container', 'my-5');

  const ul = document.createElement('ul');
  ul.classList.add('list-unstyled', 'row', 'justify-content-center', 'mb-5');
  
  section.innerHTML = `
  <h2 class="text-center">Nasze pokoje</h2>
  <p class="lead text-center">Sprawdź ofertę pokoi.</p>
  <div class="loading-spinner text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="loading mt-3">Ładuję listę pokoi...</p>
  </div>
`;

  // pobieramy liste pokoi z serwera
  fetch('http://localhost:3000/rooms')
    .then(response => response.json())
    .then(rooms => {
        const lis = rooms.map(room => {
          const li = document.createElement('li');
          li.classList.add('col-lg-6', 'mb-4');

          li.innerHTML = `
          <div class="card h-100">
          <div class="card-body d-flex justify-content-between">
            <div class="text-content">
              <h4 class="card-title">${room.name}</h4>
              <p class="card-text"><strong>${room.price.toFixed(2)} PLN</strong></p>
              <p class="card-text">Liczba gości: ${room.guests}</p>
              <p class="card-text">Liczba łóżek: ${room.beds}</p>
            </div>
            <img src="${room.photo}" alt="${room.name}" class="photo">
          </div>
          <div class="card-footer">
          </div>
        </div>`

          // obsługa dat rezerwacji 
          // data od
          const dateFrom = document.createElement('input');
          dateFrom.classList.add('form-control', 'mb-2');
          dateFrom.setAttribute('type', 'date');
          const dateFromId = 'dateFrom' + room.id;
          dateFrom.setAttribute('id', dateFromId);
          dateFrom.style.width = '250px';
                  
          // utworzenie etykiety do daty od
          const labelDateFrom = document.createElement('label');
          labelDateFrom.textContent = 'Data przyjazdu';
          labelDateFrom.setAttribute('for', dateFromId);
          
          // data do
          const dateTo = document.createElement('input');
          dateTo.classList.add('form-control', 'mb-2');
          dateTo.setAttribute('type', 'date');
          const dateToId = 'dateTo' + room.id;
          dateTo.setAttribute('id', dateToId);
          dateTo.style.width = '250px';

          //utworzenie etykiety do daty do
          const labelDateTo = document.createElement('label');
          labelDateTo.textContent = 'Data wyjazdu';
          labelDateTo.setAttribute('for', dateToId);

          li.querySelector('.card-footer').append(labelDateFrom, dateFrom, labelDateTo, dateTo);

          //obsługa dodawania do koszyka
          const addToCartButton = document.createElement('button');
          addToCartButton.innerText = 'Dodaj do koszyka';
          addToCartButton.classList.add('btn', 'btn-primary');

          // Zabiegi dodajemy z parametrami dat (parametr dates = yes)
          addToCartButton.addEventListener('click', () => cartManager.addItem(room, 'yes')); 

          const detailsButton = NavButton('Więcej...', () => RoomDetails(room.id), ['btn', 'btn-secondary']);
          
          li.querySelector('.card-footer').append(addToCartButton, detailsButton);

          return li;
        });

        ul.append(...lis);

        // usuwamy element mowiacy o ladowaniu
        section.querySelector('.loading-spinner').remove();
        // podstawiamy gotowa liste z pokojami
        section.append(ul);
    });

  return section;
}
