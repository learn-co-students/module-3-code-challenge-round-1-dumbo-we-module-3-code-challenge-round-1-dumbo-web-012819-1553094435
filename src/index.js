// ===== Variable Definitions

const ulBeerList = document.querySelector('#list-group');
const beerDetailDiv = document.querySelector('#beer-detail');


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

// ===== Event Listeners

document.addEventListener('DOMContentLoaded', (event) => {
  getAllBeers();
})

ulBeerList.addEventListener('click', (event) => {
  getOneBeer(event.target.id);
})

beerDetailDiv.addEventListener('click', (event) => {
  if (event.target.tagName === "BUTTON") {
    const beerDescription = beerDetailDiv.querySelector('textarea').value;
    editOneBeer(event.target.dataset.id, beerDescription);
  }
})

// ===== HTML Generators

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

  const buttonTag = document.createElement('button');
  buttonTag.dataset.id = beer.id;
  buttonTag.id = "edit-beer";
  buttonTag.class = "btn btn-info";
  buttonTag.innerText = "Save";

  beerDetailDiv.append(headerOneTag, imgTag, headerThreeTag, textAreaTag, buttonTag)
}
