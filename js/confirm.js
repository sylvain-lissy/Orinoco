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

    // récupération de l'id de la commande
    const numeroCommande = localStorage.getItem('numeroCommande');
    console.log(numeroCommande);

    // récupération du prix total de la commande
    const montantCommande = localStorage.getItem('montantCommande');
    console.log(montantCommande);

    //Construction DIV recapitulatif commande
    const recapitulatifCommande = document.getElementById("recapitulatifCommande")
    const recapDiv = document.createElement("div")
    recapDiv.classList.add("col-12", "col-md-8", "col-lg-6", "mb-3")
    const recapDivText = `
        <div class="card mb-4 mb-lg-0 border-primary shadow">
            <h5 class="card-header text-center">Merci de votre confiance !</h5>
            <div class="card-body">
                <h6>Nous vous confirmons votre adoption.</h6>
                <p>Toute l'équipe d'Ori-Bears vous remercie  pour votre geste.</p>
                <p>Vos petits oursons arriveront très prochainement chez vous.</p>
                <h6>En espérant vous revoir bientôt :)</h6>
            </div>
            <div class="alert alert-success rounded-0">
                <h6 class="alert-heading">Récapitulatif de votre commande :</h6>
                <hr>
                <div class="row">
                    <div class="col-sm-4 col-md-3">Numéro :</div>
                    <div class="col user-select-all"><small>${numeroCommande}</small></div>
                </div>
                <div class="row">
                    <div class="col-sm-4 col-md-3">Montant :</div>
                    <div class="col"><small>${montantCommande}.00 €</small></div>
                    
                </div>
            </div>
            <div class="card-footer">
                <a href="index.html" class="btn btn-primary btn-block">revenir à l'accueil</a>
            </div>
        </div>`
    recapDiv.innerHTML = recapDivText
    recapitulatifCommande.appendChild(recapDiv)

    //on vide le localstorage
    localStorage.clear()