export class Booking {
    constructor(pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    calculateTotal(nights, extras, promoCode) {
        let total = this.pricePerNight * nights;

        if (extras.includes("frukost")) {
            total += (100 * nights);
        }

        if (extras.includes("seans")) {
            total += 500;
        }

        if (promoCode === "GHOST20") {
            total = total * 0.8;
        }

        return Math.round(total);
    }

    validate(date, nights) {
        const today = new Date().toISOString().split('T')[0];
        
        if (!date || date < today) {
            return "Datumet måste vara i framtiden!";
        }
        if (nights < 1) {
            return "Du måste boka minst en natt."
        }
        return true;
    }
}