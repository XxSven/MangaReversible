'use strict';
window.addEventListener('load', init);

function init() {
    var homeButton = document.getElementsByClassName('home-button')[0],
        listButton = document.getElementsByClassName('list-button')[0],
        contactButton = document.getElementsByClassName('contact-button')[0];

    homeButton.addEventListener('click', displayContent.bind(null, 'home', homeButton));
    listButton.addEventListener('click', displayContent.bind(null, 'list', listButton));
    contactButton.addEventListener('click', displayContent.bind(null, 'contact', contactButton));

    [...document.getElementsByClassName('flip-banner-button')].forEach((button)=>{
        button.addEventListener('click', rotateHeader);
    });

    displayContent('home', homeButton);
}

function displayContent(pageName, currentButton) {
    var template;
    switch(pageName) {
        case 'list':
            template = document.getElementById('list-content').content;
            break;
        case 'contact':
            template = document.getElementById('contact-content').content;
            break;        
        case 'home':
        default:
            template = document.getElementById('home-content').content;
    }
    document.getElementsByClassName('content')[0].innerHTML = '';
    document.getElementsByClassName('content')[0].appendChild(template.cloneNode(true));

    refreshMenu(currentButton);
}

function rotateHeader() {
    var headerNode = document.getElementsByClassName('rotating-header')[0];
    if(headerNode.classList.contains('rotate')){
        headerNode.classList.remove('rotate');
    } else {
        headerNode.classList.add('rotate');
    }
}

function refreshMenu(currentButton) {
    [...document.getElementsByClassName('menu__button')].forEach((button)=>{
        button.classList.remove('menu__button--current');
    })
    currentButton.classList.add('menu__button--current');
}