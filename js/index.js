//Construction lien panier avec compteur et tooltip
const teddyBasket = JSON.parse(localStorage.getItem('adoptionTeddies'))
const teddyBasketCount = document.getElementById("teddyBasketCount")
const teddyBasketLink = document.createElement("a")
teddyBasketLink.classList.add("nav-link", "text-primary", "h5")
teddyBasketLink.setAttribute("href", "basket.html")
if (teddyBasket){
    const teddyBasketText = `Panier <span class="badge badge-pill badge-dark text-light">${teddyBasket.length}</span>`
    teddyBasketLink.innerHTML = teddyBasketText
    teddyBasketCount.appendChild(teddyBasketLink)
}else{
    const teddyBasketText = `Panier <span class="badge badge-pill badge-dark text-light">0</span>`
    teddyBasketLink.innerHTML = teddyBasketText
    teddyBasketCount.appendChild(teddyBasketLink)
}
//Fonction Gestion Erreurs
function gestionErreurs(messageErreur) {
  if (!messageErreur.ok) {
      throw Error(messageErreur.statusText);
  }
  return messageErreur;
}

//Connection à la base de données
fetch("http://localhost:3000/api/teddies")
  //Gestion d'erreur
  .then (gestionErreurs)
  //Formatage reponse au format JSON
  .then(teddiesList => teddiesList.json())
  // Recuperation du JSON tableau des oursons //
  .then(teddiesList => {
    console.log(teddiesList)
    //Creation du tableau des teddies
    const mainTeddy = document.getElementById("teddies_list")
    teddiesList.forEach(teddyList => {
      const divTeddy = document.createElement("div")
      divTeddy.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
      const text = `            
        <div class="card mb-4 mb-lg-0 border-primary shadow">
          <img src="${teddyList.imageUrl}" alt="${teddyList.name}" class="card-img-top">
          <div class="card-body">
            <h3 class="card-title h5">${teddyList.name}</h3>
            <p class="card-text">Prix : ${teddyList.price / 100}.00 €</p>
            <a href="product.html?id=${teddyList._id}" class="btn btn-primary btn-block stretched-link">Adopter ${teddyList.name} ?</a>
          </div>
        </div>`
      divTeddy.innerHTML = text
      mainTeddy.appendChild(divTeddy)
    })
  })
  .catch (function(error){
    //console.log(error)
    const erreurMessage = document.getElementById("erreurServeur")
        const erreurMessagePre = document.createElement("div")
        erreurMessagePre.classList.add("modal-dialog", "modal-dialog-centered")
        const erreurMessageText = `
            <div class="modal-content border-danger">
                <div class="modal-header">
                    <h3 class="modal-title text-danger h5">Erreur !</h3>
                    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>-->
                </div>
                <div class="modal-body" id="typeErreur">
                    Le serveur a rencontré une erreur !<br>
                    <code>${error}</code><br>
                    Essayer de recharger la page ou revenir plus tard.<br>
                    Nous faisons notre possible pour remédier à ce problème.
                </div>
                <div class="modal-footer">
                    <a href="index.html" class="btn btn-block btn-danger">Recharger la page</a>
                </div>
            </div>`
        erreurMessagePre.innerHTML = erreurMessageText
        erreurMessage.appendChild(erreurMessagePre)
    $('#erreurServeur').modal('show')
  })
