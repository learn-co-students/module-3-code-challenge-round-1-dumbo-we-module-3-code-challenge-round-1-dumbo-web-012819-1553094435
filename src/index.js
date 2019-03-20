const beerList = document.getElementById('list-group')
const beerDetails = document.getElementById('beer-detail')


//===== List beer names
fetch(`http://localhost:3000/beers`)
    .then(res => res.json())
    .then(beers => {
        beers.forEach(beer => {
            beerList.innerHTML += beerLi(beer)
        })
    })
//=========HTML functions
const beerLi = (beer) => {
    return `<li id="${beer.id}"class="list-group-item">${beer.name}</li>`
}
const beerInfo = (beer) => {
    return `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea id="${beer.id}"name="description">${beer.description}</textarea>
    <button id="${beer.id}" name="save"class="btn btn-info">
      Save
    </button>`
}
//=======BEER INFO EVENTS
beerList.addEventListener('click', (event) => {
    event.preventDefault()
    const beerId = parseInt(event.target.id)
    fetchBeerObject(beerId)
        .then(res => res.json())
        .then(beer => {
            beerDetails.innerHTML = beerInfo(beer)
        })
})
beerDetails.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.name === "save") {
        const newDescription = event.target.previousElementSibling.value
        const editId = event.target.id

        updateBeer(newDescription, editId)
            .then(res => res.json())
            .then(beer => {
                let textArea = beerDetails.children[3].value
                beerInfo(beer)
                //===== Not really necessary
                textArea = `<textarea id="${beer.id}">${beer.description}</textarea>`
            })
    }
})
//====== FETCHES
const fetchBeerObject = (beerId) => {
    return fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "GET",
    })
}

const updateBeer = (newDescription, editId) => {
    return fetch(`http://localhost:3000/beers/${editId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: newDescription
        })
    })
}