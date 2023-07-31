interface Manga {
  covers: MangaCovers[]
  name: string
}

interface MangaCovers {
  imageOriginal: string
  imageVariant: string
}

function rotateHeader (): void {
  const headerNode = document.getElementsByClassName('rotating-header')[0]
  if (headerNode.classList.contains('rotate')) {
    headerNode.classList.remove('rotate')
  } else {
    headerNode.classList.add('rotate')
  }
}

function refreshMenu (currentButton): void {
  [...document.getElementsByClassName('menu__button')].forEach((button) => {
    button.classList.remove('menu__button--current')
  })
  currentButton.classList.add('menu__button--current')
}

function refreshMainContent (contentName): void {
  const templateNode = document.getElementById(contentName) as HTMLTemplateElement
  const template = templateNode?.content
  document.getElementsByClassName('main-content')[0].innerHTML = ''
  document.getElementsByClassName('main-content')[0].appendChild(template.cloneNode(true))
}

function showDetail (manga: Manga): void {
  const mangaContentNode = document.getElementsByClassName('manga-content')[0]
  let imageNode; let imageContainerNode; let textNode
  mangaContentNode.innerHTML = ''
  if (manga.covers != null) {
    manga.covers.forEach(cover => {
      imageContainerNode = document.createElement('div')
      imageNode = document.createElement('img')
      textNode = document.createElement('p')
      imageNode.classList.add('manga-img')
      if (cover.imageOriginal !== '' && cover.imageVariant !== '') {
        imageNode.setAttribute('src', './images/' + cover.imageOriginal)
        imageNode.setAttribute('data-isoriginal', '')
        textNode.innerText = 'Original'
        imageContainerNode.addEventListener('click', (e) => {
          const displayedImage = imageContainerNode.getElementsByTagName('img')[0] as HTMLImageElement
          const displayedText = imageContainerNode.getElementsByTagName('p')[0]
          if (displayedImage.hasAttribute('data-isoriginal')) {
            displayedImage.setAttribute('src', './images/' + cover.imageVariant)
            displayedImage.removeAttribute('data-isoriginal')
            displayedText.innerText = 'Variant'
          } else {
            displayedImage.setAttribute('src', './images/' + cover.imageOriginal)
            displayedImage.setAttribute('data-isoriginal', '')
            displayedText.innerText = 'Original'
          }
        })
        imageContainerNode.appendChild(imageNode)
      } else if (cover.imageVariant !== '') {
        imageNode.setAttribute('src', './images/' + cover.imageVariant)
        imageContainerNode.appendChild(imageNode)
        textNode.innerText = 'Variant'
      } else if (cover.imageOriginal !== '') {
        imageNode.setAttribute('src', './images/' + cover.imageOriginal)
        imageContainerNode.appendChild(imageNode)
        textNode.innerText = 'Original'
      } else {
        imageNode.setAttribute('src', './images/undefined.png')
        imageContainerNode.appendChild(imageNode)
        textNode.innerText = ''
      }
      imageContainerNode.appendChild(textNode)
      mangaContentNode.appendChild(imageContainerNode)
    })
  }
}

function displayMangaContent (): void {
  const mangaList = document.getElementsByClassName('manga-list')[0]
  fetch('./data.json')
    .then(async (response) => await response.json(),
      () => {
        // Pour tester en local (pas de fetch)
        return {
          mangas: [
            {
              name: 'One Piece',
              starters: [
                {
                  isbn: '...',
                  image: 'starter_op1.png'
                }
              ],
              covers: [
                {
                  title: 'One Piece T.83 20 ans',
                  isbn: '...',
                  imageOriginal: 'cover_op1.jpg',
                  imageVariant: 'variant_op1.jpg'
                }
              ]
            },
            {
              name: 'Dead Tube'
            }
          ]
        }
      }
    )
    .then((json) => {
      const mangas: Manga[] = json.mangas
      const fragment = document.createDocumentFragment()
      mangas.forEach(manga => {
        const liNode = document.createElement('li')
        liNode.addEventListener('click', showDetail.bind(null, manga))
        liNode.innerText = manga?.name
        fragment.appendChild(liNode)
      })
      mangaList.appendChild(fragment)
    }, () => {})
}

function displayContent (pageName: string, currentButton: HTMLButtonElement): void {
  switch (pageName) {
    case 'list':
      refreshMainContent('list-content')
      displayMangaContent()
      break
    case 'contact':
      refreshMainContent('contact-content')
      break
    case 'home':
    default:
      refreshMainContent('home-content')
  }

  refreshMenu(currentButton)
}

function init (this: Window, ev: Event): void {
  const homeButton = document.getElementsByClassName('home-button')[0] as HTMLButtonElement
  const listButton = document.getElementsByClassName('list-button')[0]
  const contactButton = document.getElementsByClassName('contact-button')[0]

  homeButton.addEventListener('click', displayContent.bind(null, 'home', homeButton))
  listButton.addEventListener('click', displayContent.bind(null, 'list', listButton))
  contactButton.addEventListener('click', displayContent.bind(null, 'contact', contactButton));

  [...document.getElementsByClassName('flip-banner-button')].forEach((button) => {
    button.addEventListener('click', rotateHeader)
  })

  displayContent('home', homeButton)
}

window.addEventListener('load', init)
