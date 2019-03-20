
let ulTag = document.querySelector("#list-group")
let beerDetails = document.querySelector("#beer-detail")

document.addEventListener('DOMContentLoaded', function(e){

  fetch(`http://localhost:3000/beers`)
    .then(response => response.json())
    .then(json => {
      for (let beer of json){
        ulTag.innerHTML += `<li class="list-group-item" data-id="${beer.id}" data-name="${beer.name}"
        data-tagline="${beer.tagline}" data-first-brewed="${beer.first_brewed}"
        data-description="${beer.description}" data-image-url="${beer.image_url}"
        data-food-pairing="${beer.food_pairing}" data-brewers-tips="${beer.brewers_tips}"
        data-contributed-by="${beer.contributed_by}"
        ">${beer.name}
        </li>`
      }
    })
})

ulTag.addEventListener('click', function(event){
  if (event.target.className === "list-group-item"){
    let id = event.target.dataset.id
    let beerName = event.target.dataset.name
    let tagline = event.target.dataset.tagline
    let image = event.target.dataset.imageUrl
    let description = event.target.dataset.description
    beerDetails.innerHTML += `<h1>${beerName}</h1>
    <img src="${image}">
    <h3>${tagline}</h3>
    <textarea data-id="${id}">${description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id="${id}">
      Save
    </button>`
  }
})

beerDetails.addEventListener('click', function(event){
  if (event.target.tagName === "BUTTON"){
    let textArea = event.target.previousElementSibling
    let newDescription = event.target.previousElementSibling.value
    // debugger
    let id = event.target.dataset.id
    let configObj = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        description: newDescription
      })
    }

    fetch(`http://localhost:3000/beers/${id}`, configObj)
      .then(response => response.json())
      .then(json => {
        let liEdit = ulTag.querySelector(`li[data-id="${id}"]`)
        liEdit.innerHTML = `<li class="list-group-item" data-id="${json.id}" data-name="${json.name}"
        data-tagline="${json.tagline}" data-first-brewed="${json.first_brewed}"
        data-description="${json.description}" data-image-url="${json.image_url}"
        data-food-pairing="${json.food_pairing}" data-brewers-tips="${json.brewers_tips}"
        data-contributed-by="${json.contributed_by}"
        ">${json.name}
        </li>`
        beerDetails.innerHTML = ""
      })
  }
})
