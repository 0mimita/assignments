import { assignments } from './assignments.js';

export function renderNavigation(currentPageId, isSubFolder = false) {
    const navElement = document.querySelector('#main-nav');
    const ul = document.createElement('ul');

    const liHome = document.createElement('li');
    const aHome = document.createElement('a');
    aHome.textContent = "Hem";

    aHome.href = isSubFolder ? "../index.html" : "index.html";
    
    if (currentPageId === 'home') aHome.classList.add('active');
    
    liHome.appendChild(aHome);
    ul.appendChild(liHome);

    assignments.forEach(task => {
        if (task.id === 'home') return;

        const li = document.createElement('li');
        const a = document.createElement('a');
        
        let finallink = isSubFolder ? "../" + task.link : task.link;
        
        a.href = finallink;
        a.textContent = task.title;

        if (task.id === currentPageId) {
            a.classList.add('active');
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    navElement.appendChild(ul);
}