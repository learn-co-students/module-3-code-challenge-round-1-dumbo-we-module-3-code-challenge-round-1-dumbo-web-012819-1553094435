//grabbing elements from DOM

const beerListTag = document.querySelector('#list-group')
const beerDetailTag = document.querySelector('#beer-detail')
const saveButtonTag = document.querySelector('button#edit-beer.btn.btn-info')

//-------getting all beers from API
const getAllBeers = () => {
    fetch('http://localhost:3000/beers')
        .then(res => res.json())
        .then((arrayOfBeers) => {
            arrayOfBeers.forEach((beer) => {
                beerListTag.innerHTML += renderBeerTitle(beer)
            })
        })
}

//-------------config beer object
// const configUpdateBeerDescription = (newBeerDescription) => {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: {
//         description: `${newBeerDescription}`
//     }
// }
//----------getting specific beer details from API

const getSpecificBeer = (id) => {
    fetch(`http://localhost:3000/beers/${id}`)
        .then(res => res.json())
        .then((beer) => {
            beerDetailTag.innerHTML += renderBeerDetails(beer)
        })
}


//------patch new description of beer
const saveNewDescription = (id, newBeerDescription) => {
    fetch(`http://localhost:3000/beers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: {
                description: `${newBeerDescription}`
            }
        })
        .then(res => res.json())


}


//-------render beer's title

const renderBeerTitle = (beer) => {
    return `<li data-id ="${beer.id}"class="list-group-item">${beer.name}</li>`
}

//------------render beer detail
const renderBeerDetails = (beer) => {
    return `<h1>${beer.name}</h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea>${beer.description}</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button>`
}

//----------event listeners

document.addEventListener('DOMContentLoaded', (e) => {
    getAllBeers()
})

//------listens to specific beer
document.addEventListener('click', (e) => {
    if (e.target.className === 'list-group-item') {
        const beerID = e.target.dataset.id
        getSpecificBeer(beerID)
    } else {
        if (e.target.className === 'btn btn-info') {
            const beerID = e.target.dataset.id
            const newDescription = e.target.parentElement.querySelector('textarea').value
            saveNewDescription(beerID, newDescription)
        }

    }
})