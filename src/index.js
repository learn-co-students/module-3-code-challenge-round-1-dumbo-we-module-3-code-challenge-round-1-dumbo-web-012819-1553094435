const BEERURL = "http://localhost:3000/beers";

const beerUlTag = document.querySelector('#list-group');
const beerDetailDivTag = document.querySelector('#beer-detail');

const createBeerListing = (obj) => {
  const liTag = document.createElement('li');
  liTag.className = 'list-group-item';
  liTag.dataset.id = obj.id
  liTag.innerText = obj.name;
  return liTag;
}

const createBeerDetail = ({name, image_url, tagline, description}) => {
  return `
    <h1>${name}</h1>
    <img src=${image_url}></img>
    <h3>${tagline}</h3>
    <form id="edit-beer-form">
      <textarea name="description">${description}</textarea>
      <button type="submit" id="edit-beer" class="btn btn-info">Save</button>
    </form>
    <button id="delete-beer" class="btn btn-info">Delete</button>
  `
}

fetch(BEERURL)
  .then(resp => resp.json())
  .then(beerObjs => {
    beerObjs.forEach(function(beer) {
      beerUlTag.append(createBeerListing(beer));
    })
  })

const beerDetailFetch = (id) => {
  return fetch(BEERURL + `/${id}`)
    .then(resp => resp.json())
}
const newBeerDetail = () => {
  return `
  <form id="new-beer-form">
  Beer Name:<br>
  <input type="text" name="name" placeholder="Beer Name"><br>
  Beer Image:<br>
  <input type="text" name="image" placeholder="Beer Image URL"><br>
  Description:<br>
  <textarea name="description" placeholder="Write Description Here"></textarea>
  </form>
  <button type="submit" class="btn btn-info">Save</button>`
}

const beerDeleteFetch = (id) => {
  return fetch(BEERURL + `/${id}`, {method: 'DELETE'})
    .then(resp => resp.json())
}
const postConfig = (name, description, image_url) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      description: description,
      image_url: image_url
    })
  }
}
const patchConfig = (description) => {
  return {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: description
    })
  }
}

beerUlTag.addEventListener('click', function(event) {
  if(event.target.innerText === 'New Beer') {
    beerDetailDivTag.innerHTML = '';
    beerDetailDivTag.innerHTML += newBeerDetail();

    console.log("working!");

  } else if(event.target.tagName === 'LI') {
    let id = event.target.dataset.id;

    beerDetailFetch(id)
      .then(obj => {
        beerDetailDivTag.dataset.id = obj.id;

        beerDetailDivTag.innerHTML = '';
        beerDetailDivTag.innerHTML += createBeerDetail(obj);
      })
  }
})

beerDetailDivTag.addEventListener('submit', function(event) {
  event.preventDefault();

  let id = event.target.parentElement.dataset.id;
  let description = event.target.description.value;

  fetch(BEERURL + `/${id}`, patchConfig(description))
    .then(resp => resp.json())
    .then(obj => {
      if(!!obj) {
        alert("Beer Updated!");
        description = obj.description;
      }
    })
    .catch(error => alert("SERVER ERROR!"));
})

beerDetailDivTag.addEventListener('click', function(event) {
  if(event.target.innerText === 'Delete') {
    let id = event.target.parentElement.dataset.id;
    let beerLiTag = beerUlTag.querySelector(`li[data-id="${id}"]`);

    beerDeleteFetch(id)
      .then(obj => {
        if(!!obj) {
          beerDetailDivTag.innerHTML = '';
          beerUlTag.querySelector(`li[data-id="${id}"]`);
          beerLiTag.remove();
        }
      })
  }
})
