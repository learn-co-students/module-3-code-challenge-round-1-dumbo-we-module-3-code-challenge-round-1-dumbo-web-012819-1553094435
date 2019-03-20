//////////////////////////////// grab Tags /////////////////////////////

const allBeersUl = document.querySelector('ul.list-group')
const beerDetailsDiv = document.querySelector('#beer-detail')

/////////////////////////////// helper methods //////////////////////

const createBeerTag = (obj) => {
    const newTag = document.createElement('li');
    newTag.id = obj.id;
    newTag.className = "list-group-item";
    newTag.innerText = obj.name
    allBeersUl.append(newTag);

    // const newTag = `<li id="${obj.id}" class="list-group-item">${obj.name}</li>`;
    // allBeersUl.innerHTML = newTag + allBeersUl.innerHTML;
}

const createBeerDiv = (obj) => {

  // const beerNameH1Tag = document.createElement('h1');
  // beerNameH1Tag.innerText = obj.name;
  //
  // const beerImageTag = document.createElement('img');
  // beerImageTag.src = obj.image_url;
  //
  // const beerTaglineH3Tag = document.createElement('h3');
  // beerTaglineH3Tag.innerText = obj.tagline;
  //
  // const beerDescrpitionTag = document.createElement('textarea');
  // beerDescrpitionTag.innerText = obj.description;
  // beerDescrpitionTag.id = obj.id;
  //
  // const editBeerButton = document.createElement('button');
  // editBeerButton.innerText = "Save";
  // editBeerButton.className = "btn btn-info";
  // editBeerButton.id = "edit-beer";
  //
  // beerDetailsDiv.append(beerNameH1Tag, beerImageTag, beerTaglineH3Tag, beerDescrpitionTag, editBeerButton);

  const newDiv = `
  <h1>${obj.name}</h1>
  <img src="${obj.image_url}">
  <h3>${obj.tagline}</h3>
  <textarea id="${obj.id}">${obj.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>
  `;
  beerDetailsDiv.innerHTML = newDiv;
}

/////////////////////////// config Objs ////////////////////////////

const updateConfigObj = (newDescription) => {
  return
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( { description: newDescription } )
  }

}

//////////////////////////////// Fetch /////////////////////////////////////
const fetchAllBeers = () => {
  fetch('http://localhost:3000/beers')
  .then(r => r.json())
  .then(objArr => { objArr.forEach(obj => createBeerTag(obj)) })
};

const getBeerDetail = (id) => {
  fetch(`http://localhost:3000/beers/${id}`)
  .then(r => r.json())
  .then(response => createBeerDiv(response))
}

const updateBeerDescription = (id, newDescription) => {
  return fetch(`http://localhost:3000/beers/${id}`, updateConfigObj(newDescription))
  .then( r => r.json())
}



////////////// DOM LOADED ///////////////////
document.addEventListener('DOMContentLoaded', () => {
  fetchAllBeers();
})

/////////////// event listeners ////////////////

allBeersUl.addEventListener('click', (e) => {
  const id = e.target.id;
  getBeerDetail(id);
})

beerDetailsDiv.addEventListener('click', (e) => {
  if (e.target.id === "edit-beer") {
    const beerDetails = e.target.parentElement.querySelector('textarea');
    updateBeerDescription(beerDetails.id, beerDetails.value)
    .then( response => beerDetails.innerText = response.description)
  }
})
