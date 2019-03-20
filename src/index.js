document.addEventListener('DOMContentLoaded', event => {
  gettingAllBeers()
})

const ulTagBeerList = document.querySelector('.list-group')

const beerLiTagHTML = (beer) => {
  return `<li class="list-group-item"> ${beer.name} </li>`
}

const gettingAllBeers = () => {
return fetch('http://localhost:3000/beers')
.then(res => res.json())
.then(beers => beers.forEach(beer => {
  ulTagBeerList.innerHTML += beerLiTagHTML(beer)
}))
}

const divTag = document.querySelector('#beer-detail')

const creatingBeerDetailsHTML = (beer) => {
  return `<h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
              Save
          </button>`
}

ulTagBeerList.addEventListener('click', event => {
  if (event.target.className === "list-group-item") {
        id = parseInt(divTag.data.id)
        debugger
  }
})


const gettingTheOneBeerDetails = (id) => {
  fetch(`http://localhost:3000/beers/${id}`)
  .then(res => res.json())
  .then(console.log)
}
