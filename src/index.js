const beerListUl = document.querySelector('ul.list-group')
const beerDetailDiv = document.querySelector('div#beer-detail')

const createBeerList = (beer) => {
  return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

const showBeerDetail = (beer) => {
  return `<h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>`
}

fetch('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then(beers => {
    beers.forEach(beer => {
      beerListUl.innerHTML += createBeerList(beer)
    })
  })

const fetchClickedBeer = (id) => {
  return fetch(`http://localhost:3000/beers/${id}`)
}

const upateBeerDetailsApi = (id, details) => {
  return fetch(`http://localhost:3000/beers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: details
    })
  })
}

beerListUl.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const id = parseInt(event.target.dataset.id)
    fetchClickedBeer(id)
      .then(resp => resp.json())
      .then(beer => {
        beerDetailDiv.dataset.beerId = id
        beerDetailDiv.innerHTML = showBeerDetail(beer)
      })
  }
})

beerDetailDiv.addEventListener('click', event => {
  if (event.target.tagName === "BUTTON") {
    const updatedDetails = event.target.parentElement.querySelector('textarea').value
    const id = parseInt(event.target.parentElement.dataset.beerId)
    upateBeerDetailsApi(id, updatedDetails)
      .then(resp => resp.json())
      .then(beer => {
        if (!!beer) {
          event.target.parentElement.querySelector('textarea').value = updatedDetails
        } else {
          alert('Please try again.')
        }
      })
  }
})


















//
