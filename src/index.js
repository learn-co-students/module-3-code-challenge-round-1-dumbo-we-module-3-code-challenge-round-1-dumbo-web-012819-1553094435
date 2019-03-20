// variables:
const beerURL = "http://localhost:3000/beers"
const ulTag = document.querySelector('#list-group')
const liBeerTag = document.querySelector('#list-group-item')
const divBeerDetail = document.querySelector('#beer-detail')
//-----

// functions:
function createBeerItem(beer) {
    return `
      <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
    `
};

function createBeerDetails(beer) {
  return `
    <div id="beer-detail" data-id="${beer.id}">
      <h1>${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>Beer Tagline</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info">
        Save
      </button>
    </div>
  `
};

function updateBeer(id, newDescription) {
  const beerObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      description: newDescription
    })
  };

  return fetch(beerURL + '/', id, beerObj)
  .then(resp => resp.json())
};
//-----

// event listeners:
ulTag.addEventListener('click', e => {
  // let divTag = e.target.className
  // debugger
  if (e.target.className === "list-group-item") {
    divBeerDetail.style.display
  }
}); // I'm stuck on this one so far...

divBeerDetail.addEventListener('click', e => {
  let divTag = e.target.parentElement
  if (e.target.className === "btn btn-info") {
    let descriptionOnDOM = e.target.parentElement.querySelector('textarea')
    let newDescription = e.target.parentElement.querySelector('textarea').innerHTML
    // debugger
    updateBeer(divTag.dataset.id, newDescription)
    .then(updatedBeerObj) => {
      if(!!updatedBeerObj) {
        descriptionOnDOM.innerHTML = newDescription
      }
    }
  }
});
//-----


// Gets beers
fetch(beerURL)
.then(resp => resp.json())
.then(beers => {
  beers.forEach(beer => {
    // ulTag.innerHTML += createBeerItem(beer)
    divBeerDetail.innerHTML += createBeerDetails(beer)
  })
});
