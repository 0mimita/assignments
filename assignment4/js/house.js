import { getScareLevelText } from './utils.js'
import { Booking } from './booking.js'

const params = new URLSearchParams(window.location.search);
const houseId = parseInt(params.get('id'));

let currentHouse = null;
let bookingManager = null;

const detailContainer = document.getElementById("house-details");
const bookingForm = document.getElementById("booking-form");
const totalPriceDisplay = document.getElementById("display-total");

async function init() {
    try {
        const response = await fetch('data/houses.json');
        const houses = await response.json();

        currentHouse = houses.find(h => h.id === houseId);

        if (!currentHouse) {
            detailContainer.innerHTML = "<h2>Huset hittades inte!</h2>";
            return;
        }

        renderHouse(currentHouse);

        bookingManager = new Booking(currentHouse.pricePerNight);
        updatePrice();

        fetchWeather(currentHouse.coordinates.lat, currentHouse.coordinates.lng);

    } catch (err) {
        detailContainer.innerHTML = "<p>Kunde inte ladda huset.</p>";
    }
}

function renderHouse(house) {
    const headerTitle = document.getElementById("house-name-header");
    if (headerTitle) headerTitle.innerText = house.name.toUpperCase();

    detailContainer.innerHTML = `
        <div class="house-detail-card">
            <div class="image-container">
                <img src="images/${house.image}" alt="${house.name}">
            </div>
            <div class="info-content">
                <span class="scare-tag">${getScareLevelText(house.scareLevel)}</span>
                <p class="description">${house.description}</p>
                <div class="meta-data">
                    <p><strong>Plats:</strong> ${house.location}</p>
                    <p><strong>Spöken:</strong> ${house.ghostTypes.join(", ")}</p>
                </div>
            </div>
        </div>
    `;
}

function updatePrice() {
    if (!bookingManager) return;

    const nights = document.getElementById("num-days").value;
    const promo = document.getElementById("promo-code").value;

    const extras = [];
    document.querySelectorAll(".addon:checked").forEach(box => extras.push(box.value));

    const total = bookingManager.calculateTotal(nights, extras, promo);
    totalPriceDisplay.innerText = total;
}

async function fetchWeather(lat, lng) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const data = await res.json();
        document.getElementById("api-data").innerHTML = `<h3>Väder på platsen: ${data.current_weather.temperature}°C</h3>`;
    } catch (e) { /*tyst fel*/ }
}

bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("checkin-date").value;
    const nights = document.getElementById("num-days").value;
    const promo = document.getElementById("promo-code").value;

    const extras = [];
    document.querySelectorAll(".addon:checked").forEach(box => extras.push(box.value));

    const result = bookingManager.validate(date, nights);

    const messageDiv = document.getElementById("booking-message");

    if (result === true) {
        const total = bookingManager.calculateTotal(nights, extras, promo);

        messageDiv.innerHTML = `
            <h3>Bokning bekräftad</h3>
            <p><strong>Hus:</strong> ${currentHouse.name}</p>
            <p><strong>Datum:</strong> ${date}</p>
            <p><strong>Nätter:</strong> ${nights}</p>
            <p><strong>Tillägg:</strong> ${extras.length ? extras.join(", ") : "Inga"}</p>
            <p><strong>Totalpris:</strong> ${total} kr</p>
            <p>Tack för din bokning</p>
        `;
    } else {
        messageDiv.innerHTML = `<p style="color:red;">${result}</p>`;
    }
});

init();
