const ulTag = document.querySelector('#list-group');

const divTag = document.querySelector('#beer-detail');

const createBeerLi = (beer) => {
   return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

const createBeerDiv = (beer) => {
   return `
      <h1 data-id="${beer.id}">${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea name="description">${beer.description}</textarea>
      <br/>
      <button id="edit-beer" class="btn btn-info">
      Save
      </button>
   `
}


ulTag.addEventListener('click', (event) => {
   if (event.target.className === 'list-group-item') {
      // console.log(event.target.dataset.id)
      return fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
         .then(resp => resp.json())
         .then(beer => {
            divTag.innerHTML = createBeerDiv(beer)
            // console.log('hi')
         })
   }
})

const updateBeerInfo = (id, description) => {
   fetch(`http://localhost:3000/beers/${id}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({
         description: description
      })
   })
      .then(resp => resp.json())
      .then(beerDOM => {
         beerDOM.innerHTML = description
         // console.log('hi')
      })
}

divTag.addEventListener('click', (event) => {
   event.preventDefault();
   if (event.target.className === 'btn btn-info') {
      // console.log(event.target.parentElement)
      const updatedBeerDesc = event.target.parentElement.children[3].value;

      const beerId = event.target.parentElement.children[0].dataset.id;
      // const currentBeerDesc =

      updateBeerInfo(beerId, updatedBeerDesc)

      // console.log('hi')
   }

})


fetch('http://localhost:3000/beers')
   .then(resp => resp.json())
   .then(allBeers => {
      allBeers.forEach(beer => {
         ulTag.innerHTML += createBeerLi(beer)
      })
   })
