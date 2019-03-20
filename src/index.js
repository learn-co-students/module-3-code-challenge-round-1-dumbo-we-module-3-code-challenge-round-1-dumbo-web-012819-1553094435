const listGroupUlTag = document.querySelector('.list-group');
const beerDetailDivTag = document.querySelector('#beer-detail');
//const saveButton = document.querySelector('#edit-beer');
//console.log(saveButton)
const beerHeaderTag = document.querySelector('.col-md-8');
console.log(beerHeaderTag)

const beerList = (beer) => {
    return `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
}


//==========fetches
const beerDetails = (beerId) => {
    return fetch(`http://localhost:3000/beers/${beerId}`)
}

fetch('http://localhost:3000/beers').then(resp => resp.json())
.then(beerObjs => (beerObjs.forEach(beer => {
    listGroupUlTag.innerHTML = beerList(beer) + listGroupUlTag.innerHTML;
})))

const updateBeerDetails = (beerId, description) => {
    return fetch(`http://localhost:3000/beers/${beerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: description
        })
    })
}

//==========eventlisterners
listGroupUlTag.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    beerDetails(id).then(resp => resp.json())
    .then(beerObj => {
        beerDetailDivTag.innerHTML += `<h1>${beerObj.name}</h1>
        <img src="${beerObj.image_url}">
        <h3>${beerObj.tagline}</h3>
        <textarea>${beerObj.description}</textarea>
        <button id="edit-beer" class="btn btn-info" data-id="${beerObj.id}">Save</button>`
    })
})

beerHeaderTag.addEventListener('click', (e) => {
    if (e.target.closest('DIV').querySelector('#beer-detail').children[4].textContent === 'Save'
) {
    debugger
    // const updatedDescription = e.target.closest('DIV').querySelector('#beer-detail').children[3].textContent
    // const beerId = e.target.closest('DIV').querySelector('#beer-detail').children[4];
    // updateBeerDetails(beerId, description).then(resp => resp.json())
    // .then(description => {
    //     listGroupUlTag.innerHTML = `${description.updatedDescription}`
    // })
}


})
