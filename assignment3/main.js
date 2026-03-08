import { Match } from './Match.js';
import { renderNavigation } from '../navigation.js';

renderNavigation('assignment3', true); 

const bracket = document.getElementById('bracket');
const resetBtn = document.getElementById('reset-btn');
const playBtn = document.getElementById('play-round-btn');

let currentMatches = []; 
let currentTitle = "";

async function init() {
    bracket.innerHTML = "";
    playBtn.disabled = false;
    
    const response = await fetch('contestants.json');
    const players = await response.json();

    generateRound("Kvartsfinal", players);
}

function generateRound(title, participants) {
    currentTitle = title;
    currentMatches = [];

    const roundDiv = document.createElement('div');
    roundDiv.className = 'round';
    roundDiv.innerHTML = `<h2>${title}</h2>`;

    for (let i = 0; i < participants.length; i += 2) {
        const match = new Match(participants[i], participants[i+1]);
        currentMatches.push(match);
        roundDiv.appendChild(match.render());
    }
    bracket.appendChild(roundDiv);
}

playBtn.onclick = () => {
    const winners = currentMatches.map(match => match.compete());

    if (currentTitle === "Kvartsfinal") {
        generateRound("Semifinal", winners);
    } else if (currentTitle === "Semifinal") {
        generateRound("Final", winners);
    } else if (currentTitle === "Final") {
        const crown = document.createElement('h1');
        crown.innerHTML = `Mästare: ${winners[0].name}`;
        bracket.appendChild(crown);
        playBtn.disabled = true; 
    }
};

resetBtn.onclick = init;
init();