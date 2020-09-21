//Construction lien panier avec compteur et tooltip
function CompteurPanierNavBar(){
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
}

//Fonction de création du tableau des teddies
function tableauTeddies(teddiesList){
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
}

//Gestion erreur et affichage du message
function gestionErreurMessage(error){
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
                <a href="${window.location}" class="btn btn-block btn-danger">Recharger la page</a>
            </div>
        </div>`
    erreurMessagePre.innerHTML = erreurMessageText
    erreurMessage.appendChild(erreurMessagePre)
    $('#erreurServeur').modal('show')
}

// Verification validité prénom, nom, ville
function valideDivers(value) { 
    return /^[A-Z-a-z\s]{3,40}$/.test(value)
}

// Verification validité adresse
function valideAdresse(value) { 
    return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
}

// Verification validité mail
function valideEmail(value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}
