//===================================H E L P E R   T A G   M E T H O D S ============== ==============================//
const ulTag = document.querySelector ('.list-group');
const liTag = document.querySelector('.list-group-item');
//========================================= G E T   B E E R S   F R O M   S E R V E R   ==============================//
fetch (`http://localhost:3000/beers`)
    .then (response => response.json()
    .then (beers => {
        beers.forEach(beer => {
        ulTag.innerHTML += createBeerLIST(beer);
        liTag.innerHTML += beerCard(beer);
        })
    }),
);

// create beer card function (similar to create beer list) that sets up the structure of the card that will populate
// when clicked.
const createBeerCard = (beer) => {
//    return (
//        `<h1>${beer.name</h1>
//         <img src=${beer.url}>
//            <h3>${beer.tagLine}</h3>
//            <textarea>${beer.description}</textarea>
//            <button id="edit-beer" class="btn btn-info">
//            Save</button>
//        `
//    )
// }
    // ran out of time... didnt get a chance to format
//========================================= C R E A T E   B E E R   L I S T   ========================================//
    const createBeerLIST = (beer) => {
        return (
        `<ul class="list-group">
            <li class="list-group-item">${beer.name}</li>
        </ul>
        `)
    };
//========================================= A C T I O N L I S T E N E R    ===========================================//
liTag.addEventListener('click', evt => {
    evt.preventDefault();
    if (evt.target.className === 'list-group'){
        let singleBeer = e.target.className('list-group');
        showSingleBeer(singleBeer)
    }
});
// ====================================== S H O W   S I N G L E   B E E R  ===========================================//
const showSingleBeer = (beer) =>{
    fetch (`http://localhost:3000/beers/${beer.id}`, settings)
        .then (response => response.json())
        .then (beerInfoPopup =>{
            showSingleBeer(beerInfoPopup)
        })
};

//========================H E L P E R   M E T H O D   F O R  F E T C H   S E T T I N G S =============================//
const settings = {
    method: 'POST',
    helpers: {
        'Content-Type': "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
        name: name,
        image_url: image,
        tagLine: tagLine,
        description: description,
        //food_pairing: food_pairing,
        //brewers_tips: tips,
        //contributed_by: contributed_by
        //first_brewed: first_brewed,
    })
};
//====================================== E D I T   B E E R  D E T A I L S ===========================================//
// method that will change the description on te back end
const editBeerInfo = (newDescription) =>{
    return fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: newDescription
        })
    })
        //updates the dom
        .then (response => response.json())
        .then (updatedDescription =>{
            //calls helper function passes in updated description
            showSingleBeer(updatedDescription)
        })
};

// need and action listener for when a user clicks edit that will call this edit beer info function


