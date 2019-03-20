// ===== Variable Definitions

const ulBeerList = document.querySelector('#list-group');
const beerDetailDiv = document.querySelector('#beer-detail');
const newBeerForm = document.querySelector('#new-beer-form');

// ===== Fetch Requests

const getAllBeers = () => {
  fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then((allBeers) => {
      allBeers.forEach(beer => {
        generateBeerListHTML(beer)
      })
    })
}

const getOneBeer = (id) => {
  fetch(`http://localhost:3000/beers/${id}`)
    .then(resp => resp.json())
    .then((beer) => {
      generateBeerHTML(beer);
    })
}

const editOneBeer = (id, description) => {
  fetch(`http://localhost:3000/beers/${id}`, {
    method: 'PATCH',
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'},
    body: JSON.stringify({description: description})
  })
    .then(resp => resp.json())
    .then((beer) => {
      generateBeerHTML(beer);
    })
}

const deleteBeer = (id) => {
  fetch(`http://localhost:3000/beers/${id}`, {
    method: 'DELETE'
  })
  .then(resp => {
    deleteBeerHTML(id);
  })
}

const addNewBeer = (name, tagline, first_brewed, description, image_url, food_pairing, brewers_tips, contributed_by) => {
  fetch('http://localhost:3000/beers/', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'},
    body: JSON.stringify({name: name, tagline: tagline, first_brewed: first_brewed, description: description, image_url: image_url, food_pairing: [food_pairing], brewers_tips: brewers_tips, contributed_by: contributed_by})
  })
  .then(resp => resp.json())
  .then(newBeer => {
    // this doesn't work
    generateBeerHTML(newBeer);
  })
}

// ===== Event Listeners

document.addEventListener('DOMContentLoaded', (event) => {
  getAllBeers();
})

ulBeerList.addEventListener('click', (event) => {
  getOneBeer(event.target.id);
})

beerDetailDiv.addEventListener('click', (event) => {
  if (event.target.id === "edit-beer") {
    const beerDescription = beerDetailDiv.querySelector('textarea').value;
    editOneBeer(event.target.dataset.id, beerDescription);
  } else if (event.target.id === "delete-beer") {
    deleteBeer(event.target.dataset.id);
  }
})

newBeerForm.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const name = event.target.parentElement.name.value;
    const tagline = event.target.parentElement.tagline.value;
    const first_brewed = event.target.parentElement.first_brewed.value;
    const description = event.target.parentElement.description.value;
    const image_url = event.target.parentElement.image_url.value;
    const food_pairing = event.target.parentElement.food_pairing.value;
    const brewers_tips = event.target.parentElement.brewers_tips.value;
    const contributed_by = event.target.parentElement.contributed_by.value;

    addNewBeer(name, tagline, first_brewed, description, image_url, food_pairing, brewers_tips, contributed_by);
  }
})

// ===== HTML Modifiers

const generateBeerListHTML = (beer) => {
  const liTag = document.createElement('li');
  liTag.className = "list-group-item";
  liTag.id = beer.id;
  liTag.innerText = beer.name;
  ulBeerList.append(liTag);
}

const generateBeerHTML = (beer) => {
  beerDetailDiv.innerHTML = "";

  const headerOneTag = document.createElement('h1');
  headerOneTag.innerText = beer.name;

  const imgTag = document.createElement('img');
  imgTag.src = beer.image_url;

  const headerThreeTag = document.createElement('h1');
  headerThreeTag.innerText = beer.tagline;

  const textAreaTag = document.createElement('textarea');
  textAreaTag.innerText = beer.description;
  textAreaTag.name = "description";

  const editButtonTag = document.createElement('button');
  editButtonTag.dataset.id = beer.id;
  editButtonTag.id = "edit-beer";
  editButtonTag.class = "btn btn-info";
  editButtonTag.innerText = "Save";

  const deleteButtonTag = document.createElement('button');
  deleteButtonTag.dataset.id = beer.id;
  deleteButtonTag.id = "delete-beer";
  deleteButtonTag.class = "btn btn-info";
  deleteButtonTag.innerText = "Delete Beer";

  beerDetailDiv.append(headerOneTag, imgTag, headerThreeTag, textAreaTag, editButtonTag, deleteButtonTag)
}

const deleteBeerHTML = (id) => {
  const targettedBeer = document.querySelector(`[data-id='${id}']`).parentElement;
  while(targettedBeer.firstChild) {
    targettedBeer.removeChild(targettedBeer.firstChild);
  }

  const targettedBeerListItem = document.getElementById(`${id}`);
  targettedBeerListItem.remove();
}
