/**************************************
---------- GLOBAL VARIABLES ----------
**************************************/
const beerListUl = document.querySelector('ul#list-group');
const beerDetailDiv = document.querySelector('div#beer-detail')
const BEER_URL = 'http://localhost:3000/beers';


/**************************************
--------------- ALL BEERS ------------
**************************************/
function loadBeersFromServer() {
  fetch(BEER_URL).then(res => res.json())
    .then(beerObjs => {
      beerObjs.forEach(beer => {
        beerListUl.innerHTML += createBeerLi(beer);
      })
    })
}

function createBeerLi(beer) {
  return `<li class="list-group-item" data-beer-id="${beer.id}">${beer.name}</li>`
}


/**************************************
------------- BEER DETAILS -----------
**************************************/
function loadSingleBeer(id) {
  fetch(`${BEER_URL}/${id}`).then(res => res.json())
    .then(beerObj => {
      beerDetailDiv.innerHTML = createBeerDetails(beerObj);
    })
}

function createBeerDetails(beer) {
  return (`
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info" data-beer-id="${beer.id}">
    Save
  </button>`)
}

/**************************************
------------- UPDATE BEER ------------
**************************************/
function updateBeer(id, description) {
  // Fetch settings to overide action to PATCH
  const settings = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: description})
  }

  return fetch(`${BEER_URL}/${id}`, settings)
    .then(res => res.json())
}


/**************************************
---------- EVENT LISTENERS -----------
**************************************/
document.addEventListener('DOMContentLoaded', (e) => {
  loadBeersFromServer()
})

beerListUl.addEventListener('click', (e) => {
  loadSingleBeer(e.target.dataset.beerId)
})

beerDetailDiv.addEventListener('click', (e) => {
  if (e.target.id === 'edit-beer') {
    const textareaTag = e.target.parentElement.querySelector('textarea');
    const beerId = e.target.dataset.beerId;

    updateBeer(beerId, textareaTag.value)
      .then(updatedBeer => {
        if (!!updateBeer) {
          textareaTag.value = updatedBeer.description;
          alert(`Beer Updated`)
        }
      }).catch(error => {
        alert(error)
      })
  }
})
