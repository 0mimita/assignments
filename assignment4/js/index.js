import { getScareLevelText } from "./utils";

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
        houseGrid.innerHTML = '<p>Kunde inte ladda husen: ${error.message}</p>'
    }
}

