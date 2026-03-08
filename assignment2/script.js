//importera från products.js
import { products } from './products.js';

//variabel kundvagn
//lista görs om sparat
let cart = [];
const savedCart = localStorage.getItem('gymCart');
if (savedCart) {
    cart = JSON.parse(savedCart);
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        const p = products[i];

        const card = document.createElement('div');

        card.classList.add('product-card');

        //info kortet
        card.innerHTML = `
        <img src="${p.image}" width="100">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><b>${p.price} kr<b></p>
        <button onclick="addToCart('${p.id}')">Köp</button>
        `;

        //läggs i container html
        grid.appendChild(card);

    }
}

//cart function

//anropa funktion
renderProducts();