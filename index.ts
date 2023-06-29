function rotateHeader () {
  const headerNode = document.getElementsByClassName('rotating-header')[0];
  if (headerNode.classList.contains('rotate')) {
    headerNode.classList.remove('rotate');
  } else {
    headerNode.classList.add('rotate');
  }
}

function refreshMenu (currentButton) {
  [...document.getElementsByClassName('menu__button')].forEach((button) => {
    button.classList.remove('menu__button--current');
  });
  currentButton.classList.add('menu__button--current');
}

function refreshMainContent(contentName) {
  var templateNode = document.getElementById(contentName) as HTMLTemplateElement,
      template = templateNode?.content;
  document.getElementsByClassName('main-content')[0].innerHTML = '';
  document.getElementsByClassName('main-content')[0].appendChild(template.cloneNode(true));
}

function showDetail(manga) {
  var mangaContentNode = document.getElementsByClassName('manga-content')[0],
    imageNode;
  mangaContentNode.innerHTML = '';
  if(manga.covers){
    manga.covers.forEach(cover=>{
      if(cover.imageVariant){
        imageNode = document.createElement('img');
        imageNode.setAttribute('src','./images/'+cover.imageVariant);
        mangaContentNode.appendChild(imageNode);
      }
    });
  }
}

function displayMangaContent() {
  var mangaList = document.getElementsByClassName('manga-list')[0];
  fetch(`${location.pathname.replace(/\/[^/]*\..*/, '')
    .replace(/\/$/, '')}/data.json`)
    .then((response) => response.json())
    .then((json) => {
      var mangas = json.mangas,
        fragment = document.createDocumentFragment();
      mangas.forEach(manga=>{
        let liNode = document.createElement('li');
        liNode.addEventListener('click',showDetail.bind(null, manga));
        liNode.innerText = manga?.name;
        fragment.appendChild(liNode);
        manga?.name;
      });
      mangaList.appendChild(fragment);
    });
}

function displayContent (pageName, currentButton) {
  switch (pageName) {
  case 'list':
    refreshMainContent('list-content');
    displayMangaContent();
    break;
  case 'contact':
    refreshMainContent('contact-content');
    break;
  case 'home':
  default:
    refreshMainContent('home-content');
  }

  refreshMenu(currentButton);
}

function init () {
  const homeButton = document.getElementsByClassName('home-button')[0];
  const listButton = document.getElementsByClassName('list-button')[0];
  const contactButton = document.getElementsByClassName('contact-button')[0];

  homeButton.addEventListener('click', displayContent.bind(null, 'home', homeButton));
  listButton.addEventListener('click', displayContent.bind(null, 'list', listButton));
  contactButton.addEventListener('click', displayContent.bind(null, 'contact', contactButton));

  [...document.getElementsByClassName('flip-banner-button')].forEach((button) => {
    button.addEventListener('click', rotateHeader);
  });

  displayContent('home', homeButton);
}

window.addEventListener('load', init);
