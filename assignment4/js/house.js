import { getScareLevelText } from './utils.js'
import { booking } from './booking.js'

const params = new URLSearchParams(window.location.search);
const houseId = parseInt(params.get('id'));

let currentHouse = null;
let bookingManager = null;

const detailContainer = doocument.getElementById("house-details");
const bookingForm = document.getElementById("booking-form");
const totalPriceDisplay = document.getElementById("display-total");

