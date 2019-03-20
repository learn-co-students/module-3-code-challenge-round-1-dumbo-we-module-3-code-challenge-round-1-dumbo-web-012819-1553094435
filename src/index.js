let ulTag = document.querySelector('#list-group')
let beerDetailDivTag = document.querySelector('#beer-detail')


//----- event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadBeers()
})

ulTag.addEventListener('click', (e) => {
  if(e.target.className === 'list-group-item'){
    beerId = e.target.dataset.beerId
    loadBeerDetail(beerId)
  }
})

beerDetailDivTag.addEventListener('click', (e) => {
  if(e.target.id === 'edit-beer'){
    const newDescription = e.target.parentElement.querySelector('textarea').value
    const editedBeerObj = beerObj(newDescription)
    const requestObj = configObj(editedBeerObj)
    const beerId = e.target.dataset.beerId

    saveEditedBeer(beerId, requestObj)
  }
})

//------ fetch stuff
const loadBeers = () => {
  return fetch('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then((parsedResp) => {
    parsedResp.forEach((beer) => {
      ulTag.innerHTML += renderBeerItem(beer)
    })
  })
}

const loadBeerDetail = (id) => {
  return fetch(`http://localhost:3000/beers/${id}`)
  .then(resp => resp.json())
  .then((beer) => {
    beerDetailDivTag.innerHTML = renderBeerDetail(beer)
  })
}

const saveEditedBeer = (id, configObj) => {
  return fetch(`http://localhost:3000/beers/${id}`, configObj)
  .then(resp => resp.json())
  .then((beer) => {
      beerDetailDivTag.innerHTML = renderBeerDetail(beer)
  })
}


//------- render stuff
const renderBeerItem = (beer) => {
  return `<li class="list-group-item" data-beer-id="${beer.id}">${beer.name}</li>`
}

const renderBeerDetail = (beer) => {
  return `<h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info" data-beer-id=${beer.id}>
    Save
  </button>`
}


//------- utils

const beerObj = (description) => {
  return { description: description }
}

const configObj = (beerObj) => {
  return  { method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(beerObj)
          }
    }
