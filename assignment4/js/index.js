import { getScareLevelText } from "./utils.js";

let allHouses = [];

const houseGrid = document.getElementById("house-list");
const filterForm = document.getElementById("filter-form");

//hämta data
async function fetchHouses() {
    try {
        const response = await fetch('data/houses.json');

        if (!response.ok) {
            throw new Error ("Kunde inte ladda JSON-filen");
        }

        allHouses = await response.json();

        renderHouses(allHouses);

    } catch (error) {
        console.error("Fel:", error);
        houseGrid.innerHTML = `<p>Kunde inte ladda husen: ${error.message}</p>`
    }
}

function renderHouses(housesToDisplay) {
    houseGrid.innerHTML = "";

    if (housesToDisplay.length === 0) {
        houseGrid.innerHTML = "<p class='no-results'>Inga spökhus matchar din sökning...</p>";
        return;
    }

    //klicka på husen
    housesToDisplay.forEach(house => {
        const card = document.createElement("a");
        card.href = `house.html?id=${house.id}`;
        card.className = "house-card";

        card.innerHTML = `
            <img src="images/${house.image}" alt="${house.name}">
            <div class="house-info">
                <h3>${house.name}</h3>
                <p class="location">${house.location.toUpperCase()}</p>
                <div class="price-row">
                    <span>${house.pricePerNight} KR/NATT</span>
                    <span class="scare-tag">${getScareLevelText(house.scareLevel)}</span>
                </div>
            </div>
        `;

        houseGrid.appendChild(card);
    });
}

filterForm.addEventListener("input", () => {
    const maxPrice = document.getElementById("max-price").value || Infinity;
    const minScare = document.getElementById("min-scare").value;
    const ghostType = document.getElementById("ghost-type").value;;

    const wifiOnly = filterForm.querySelector('input[type="checkbox"]').checked;

    document.getElementById("scare-label").innerText = getScareLevelText(minScare);

    const filtered = allHouses.filter(house => {
        const priceMatch = house.pricePerNight <= maxPrice;
        const scareMatch = house.scareLevel >= minScare;
        const ghostMatch = ghostType === "all" || house.ghostTypes.includes(ghostType);
        const wifiMatch = wifiOnly ? house.hasWifi : true;

        return priceMatch && scareMatch && ghostMatch && wifiMatch;
    });

    renderHouses(filtered);
});

fetchHouses();