import { assignments } from "./assignments.js";

const container = document.querySelector("#assignment-container");

assignments.forEach((task) => {
  if (task.id === "home") return;

  const card = document.createElement("div");
  card.className = "assignment-card";
  card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <a href="${task.link}">Visa uppgift</a>
    `;
  container.appendChild(card);
});

renderNavigation("home", false);
