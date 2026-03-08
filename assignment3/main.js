import { Match } from './Match.js';

const bracket = document.getElementById('bracket');
const resetBtn = document.getElementById('reset-btn');

async function init() {
    bracket.innerHTML = "";

    const response = await fetch('contestants.json');
    const players = await response.json();

    generateRound("Kvartsfinal", players);
}

function generateRound(title, participants) {
    const roundDiv = document.createElement('div');
    roundDiv.className = 'round';
    roundDiv.innerHTML = `<h2>${title}</h2>`;

    const matchesInRound = [];

    for (let i = 0; i < participants.length; i += 2) {
        const match = new Match(participants[i], participants[i+1]);
        matchesInRound.push(match);

        const html = match.render(() => {
            if (matchesInRound.every(m => m.isPlayed)) {
                const winners = matchesInRound.map(m => m.winner);
                handleNextRound(winners, title);
            }
        });
        roundDiv.appendChild(html);
    }
    bracket.appendChild(roundDiv);
}

function handleNextRound(winners, currentTitle) {
    if (winners.length === 4) generateRound("Semifinal", winners);
    else if (winners.length === 2) generateRound("Final", winners);
    else {
        const crown = document.createElement('h1');
        crown.innerHTML = `Mästare: ${winners[0].name}`;
        bracket.appendChild(crown);
    }
}

resetBtn.onclick = init;
init();