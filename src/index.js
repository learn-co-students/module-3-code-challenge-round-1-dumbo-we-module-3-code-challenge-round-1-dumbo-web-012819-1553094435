let ulTag = document.querySelector("#list-group")


const getBeersFromServer = () => {
  return fetch("http://localhost:3000/beers")
            .then(response => {return response.json()})
            .then(beerArr => {
              beerArr.forEach(beer => {
                displayAllBeersOnList(beer)
              })
            })
}

getBeersFromServer()

const getABeerFromServer = (id) => {
  return fetch(`http://localhost:3000/beers/${id}`)
            .then(response => {return response.json()})
          .then(beer => {
            displayBeersDetails(beer)
          });
}

const displayAllBeersOnList = (beer) => {
  let ulTag = document.querySelector("#list-group")
  ulTag.innerHTML +=  `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}
const displayBeersDetails = (beer) => {
    let beerDetailsDiv = document.querySelector("#beer-detail")
  return  beerDetailsDiv.innerHTML = `<h1>beer.name</h1>
                                <img src="<add beer img url here>">
                                <h3>beer.tagline</h3>
                                <textarea>Beer Description</textarea>
                                <button id="edit-beer" class="btn btn-info">
                                  Save
                                </button>`
}

  // Event Listeners

ulTag.addEventListener("click",(event) =>{
    if (event.target.className === "list-group-item"){
      getABeerFromServer(event.target.dataset.id);
}
})
