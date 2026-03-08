export class Match {
    #player1;
    #player2;
    #winner = null;
    #isPlayed = false;
    #element = null;

    constructor(p1, p2) {
        this.#player1 = p1;
        this.#player2 = p2;
    }

    get winner() { return this.#winner; }
    get isPlayed() { return this.#isPlayed; }

    render() {
        const div = document.createElement('div');
        div.className = 'match-card';

        const quote1 = this.#player1.catchphrase ?? "Fokuserar tyst...";
        const quote2 = this.#player2.catchphrase ?? "Samlar energi...";

        div.innerHTML = `
        <div class="participant p1">
            <h4>${this.#player1.name}</h4>
            <p><i>"${quote1}"</i></p>
            <small>Styrka: ${this.#player1.skillLevel ?? '5'}</small>
        </div>
        <div class="vs">VS</div>
        <div class="participant p2">
            <h4>${this.#player2.name}</h4>
            <p><i>"${quote2}"</i></p>
            <small>Styrka: ${this.#player2.skillLevel ?? '5'}</small>
        </div>
        `;

        this.#element = div; 
        return div;
    }

    compete() {
        if (this.#isPlayed) return;
        const s1 = this.#player1.skillLevel ?? 5; 
        const s2 = this.#player2.skillLevel ?? 5;
        const chanceP1 = s1 / (s1 + s2);

        this.#winner = Math.random() < chanceP1 ? this.#player1 : this.#player2;
        this.#isPlayed = true;
        this.#updateUI();
        return this.#winner;      
    }

    #updateUI() {
        this.#element.classList.add('completed');
        const participants = this.#element.querySelectorAll('.participant');
        participants.forEach(p => {
            const name = p.querySelector('h4').innerText;
            if (name === this.#winner.name) p.classList.add('winner');
            else p.classList.add('loser');
        });
    }
}