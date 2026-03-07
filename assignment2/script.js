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
        card.style.border = "1px solid black";
        card.style.padding = "10px";

        //info kortet
        card.innerHTML = `
        <img src="${p.image}" width="100">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>${p.price}</p>
        <button onclick="addToCart('${p.id}')">Köp</button>
        `;

        //läggs i container html
        grid.appendChild(card);

    }
}

//anropa funktion
renderProducts();