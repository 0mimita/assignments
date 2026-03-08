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
        <p><b>${p.price} kr</b></p>
        <p><i>Kategori: ${p.category}</i></p>
        <button onclick="addToCart('${p.id}')">Köp</button>
        `;

        //läggs i container html
        grid.appendChild(card);

    }
}

//cart function
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalSpan = document.getElementById('cart-total');

    cartList.innerHTML = "";
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const li = document.createElement('li');

    li.innerText = `${item.name}(x${item.quantity}) - ${item.price * item.quantity} kr`;
    cartList.appendChild(li);

    sum = sum + (item.price * item.quantity);
}
totalSpan.innerText = sum;
}

window.addToCart = function(id) {
    const product = products.find(p => p.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
} else {
    cart.push({ ...product, quantity: 1});
}
    
    localStorage.setItem('gymCart', JSON.stringify(cart));
    updateCart();
};

const clearBtn = document.getElementById('clear-cart');
if (clearBtn) {
    clearBtn.onclick = function() {
        cart = [];
        localStorage.removeItem('gymCart');
        updateCart();
    };
}

//anropa funktion
renderProducts();
updateCart();