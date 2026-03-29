export class Booking {
    constructor(pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    calculateTotal(nights, extras, promoCode) {
        let total = this.pricePerNight * nights;
    }
}