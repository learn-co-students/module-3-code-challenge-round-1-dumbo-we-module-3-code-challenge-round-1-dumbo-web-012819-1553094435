const allBeersUrl = "http://localhost:3000/beers";
const beersLi = document.querySelector('ul');

const addBeerToDom = ({id, name}) => {
  const liTag = document.createElement('li');
  liTag.dataset.id = id;
  liTag.className = "list-group-item";
  liTag.innerText = name;

  const ulTag = document.querySelector(".list-group");
  ulTag.prepend(liTag);
};

const displayBeerToEdit = ({id, name, image_url, tagline, description}) => {
  const beerDetailTag = document.querySelector("#beer-detail");
  beerDetailTag.innerHTML = "";

  const h1Tag = document.createElement('h1');
  h1Tag.innerText = name;

  const imgTag = document.createElement('img');
  imgTag.src = image_url;

  const h3Tag = document.createElement('h3');
  h3Tag.innerText = tagline;

  const formTag = document.createElement('form');
  formTag.dataset.id = id;

  const textareaTag = document.createElement('textarea');
  textareaTag.className = "form-control";
  textareaTag.name = "description";
  textareaTag.rows = "3";
  textareaTag.value = description;

  const buttonTag = document.createElement('button');
  buttonTag.type = "submit";
  buttonTag.className = "btn btn-info";
  buttonTag.innerText = "Save";

  formTag.append(textareaTag, buttonTag);

  beerDetailTag.append(h1Tag, imgTag, h3Tag,formTag);

};

const getAllBeers = () => {
  fetch(allBeersUrl)
  .then(response => response.json())
  .then(parsedResponse => parsedResponse.forEach(beer => addBeerToDom(beer)))
};

const getBeerInfo= (id) => {
  fetch(allBeersUrl+`/${id}`)
  .then(response => response.json())
  .then(parsedResponse =>  displayBeerToEdit(parsedResponse))
};

const updateBeerInfo = (id, description) => {
    fetch(allBeersUrl+`/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ "description" : description}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(parsedResponse =>  alert(parsedResponse.name + " was updated."))
    .catch(error =>  alert("Error updating."))
};

document.addEventListener('DOMContentLoaded', () => getAllBeers());

beersLi.addEventListener('click', event => {
  if (event.target.tagName === "LI"){
    getBeerInfo(event.target.dataset.id);
  }
});

document.addEventListener('submit', event => {
  event.preventDefault();
  updateBeerInfo(event.target.dataset.id, event.target.description.value);
});
