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
    } else{
        const teddyBasketText = `Panier <span class="badge badge-pill badge-dark text-light">0</span>`
        teddyBasketLink.innerHTML = teddyBasketText
        teddyBasketCount.appendChild(teddyBasketLink)
    }
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