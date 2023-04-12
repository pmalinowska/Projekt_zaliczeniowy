// it-spa.js

import 'bootstrap/dist/css/bootstrap.css';
import './it-spa.scss';

import { Home } from './views/Home';
import { Nav } from './navigation/Nav';

const main = document.querySelector('main');

// przyczepiamy nawigacje PRZED elementem main
main.before(Nav());


// reagujemy na zdarzenie `navigate`
document.body.addEventListener('navigate', event => {
  const Component = event.detail;

  //czyscimy zawartosc elementu main
  main.innerHTML = '';
  // nastepnie podstawiamy nowy komponent
  main.append(Component());
});


// uzytkownik wystartuje na Home
main.append(Home());
