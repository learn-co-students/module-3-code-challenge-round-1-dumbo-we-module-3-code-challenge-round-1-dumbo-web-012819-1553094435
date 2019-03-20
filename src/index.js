const ulTag = document.querySelector(".list-group")
const mainDiv = document.querySelector("#main-div")
const beerDisplay = document.querySelector("#beer-display")

// index, list all

const allBeers = async () => {
  await fetch('http://localhost:3000/beers')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(beer) {
        ulTag.innerHTML += `<li class="list-group-item" id="${beer.id}">${beer.name}</li>`
      });
    })

}
allBeers()

// Div Listener

mainDiv.addEventListener("click", (event) => {
  if (event.target.className == "list-group-item") {
    let beerId = event.target.id
    findBeer(beerId)
  } else if (event.target.id == "edit-beer") {
    const beerID = event.target.name
    editBeer(beerID)
  } else if (event.target.id == "save-beer") {
    let beerID = event.target.name
    let beerDesc = event.target.parentElement.querySelector("textarea").value

    saveBeer(beerID, beerDesc)
  }
})

// Fetch Request

const saveBeer = async (id, description) => {
  const config = {
    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: description

    })
  }

  await fetch(`http://localhost:3000/beers/${id}`, config)
    .then(response => response.json())

}

const editBeer = async (id) => {

  const config = {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  }

  await fetch(`http://localhost:3000/beers/${id}`)
    .then(response => response.json())
    .then(data => {

      beerDisplay.innerHTML = `<h1>EDIT ${data.name}</h1>
<img src="${data.image_url}">
<h3>${data.tagline}</h3>
<textarea>${data.description}</textarea>
<button id="save-beer" name="${data.id}" class="btn btn-info">
  Save
</button>
`
    })
}

const findBeer = async (id) => {
  await fetch(`http://localhost:3000/beers/${id}`)
    .then(response => response.json())
    .then(data => {
      beerDisplay.innerHTML = `<h1> ${data.name}</h1>
<img src="${data.image_url}">
<h3>${data.tagline}</h3>
<p>${data.description}</p>
<button id="edit-beer" name="${data.id}" class="btn btn-info">
  Edit
</button>
`
    })
}