//appel de la fonction Compteur du panier de la navbar
CompteurPanierNavBar()

//Connection à la base de données
fetch("http://localhost:3000/api/teddies")
    //Formatage reponse au format JSON
    .then(teddiesList => teddiesList.json())
    // Recuperation du JSON tableau des oursons //
    .then(teddiesList => {
        tableauTeddies(teddiesList)
    })
    //Gestion d'erreur
    .catch (function(error){
        gestionErreurMessage(error)
    })

////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
// Fonction de création du tableau des teddies
function tableauTeddies(teddiesList){
    const mainTeddy = document.getElementById("teddies_list")
    teddiesList.forEach(teddyList => {
        const divTeddy = document.createElement("div")
        divTeddy.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
        divTeddy.innerHTML = `            
          <div class="card mb-4 mb-lg-0 border-primary shadow">
              <img src="${teddyList.imageUrl}" alt="${teddyList.name}" class="card-img-top">
              <div class="card-body">
              <h3 class="card-title h5">${teddyList.name}</h3>
              <p class="card-text">Prix : ${teddyList.price / 100}.00 €</p>
              <a href="product.html?id=${teddyList._id}" class="btn btn-primary btn-block stretched-link">Adopter ${teddyList.name} ?</a>
              </div>
          </div>`
        mainTeddy.appendChild(divTeddy)
    })
}