const ulTag = document.querySelector('#list-group');
const divBeerDetail = document.querySelector('div.col-md-4');
const seeBeerDetail = document.querySelector('#beer-detail')
//=====eventlisteners
document.addEventListener('DOMContentLoaded',(e) =>{
  getAllBeers()
  .then(beers => {
    beers.forEach(beer => {
      ulTag.innerHTML += listAllBeers(beer)
    })
  })
})
divBeerDetail.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.className === 'list-group-item') {
    const beerId = e.target.dataset.id
    getBeerDetails(beerId)
    .then(beer => {
      seeBeerDetail.innerHTML = beerDetails(beer)
    })
  } 
})

seeBeerDetail.addEventListener('click', (e) => {
  let beerId = e.target.dataset.id
  if(e.target.tagName == 'BUTTON') {
    let newDesc = e.target.parentElement.children[3].value;
    editBeerDetail(beerId, newDesc)
    .then(newBeer => {
      e.target.parentElement.children[3].innerText = newDesc
    })
  }
})


//========Fetches=====
function getAllBeers() {
  return fetch('http://localhost:3000/beers')
    .then(res => res.json())
}

function getBeerDetails(beerId) {
  return fetch(`http://localhost:3000/beers/${beerId}`)
    .then(res => res.json())
}

function editBeerDetail(beerId, description) {
  return fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: description
    })
  }).then(res => res.json())
}


//======
function listAllBeers(beer) {
  return `
    <li data-id = "${beer.id}"class="list-group-item">${beer.name}</li>
  `
}

function beerDetails(beer) {
  return `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <ol>
    <li>${beer.food_pairing[0]}</li>
    <li>${beer.food_pairing[1]}</li>
    <li>${beer.food_pairing[2 ]}</li>

  </ol>
  <button data-id= "${beer.id} "id="edit-beer" class="btn btn-info">
    Save
  </button>
  `
}