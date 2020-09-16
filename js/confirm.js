    //Construction lien panier avec compteur et tooltip
    const teddyBasket = JSON.parse(localStorage.getItem('adoptionTeddies'))
    const teddyBasketCount = document.getElementById("teddyBasketCount")
    const teddyBasketLink = document.createElement("a")
    teddyBasketLink.classList.add("nav-link", "text-primary", "h5")
    teddyBasketLink.setAttribute("href", "basket.html")
    teddyBasketLink.setAttribute("data-toggle", "tooltip")
    teddyBasketLink.setAttribute("data-placement", "bottom")
    if (teddyBasket){
        teddyBasketLink.setAttribute("title" ,"Il y a " + teddyBasket.length + " adoption(s) en attente !")
        const teddyBasketText = `Panier (${teddyBasket.length})`
        teddyBasketLink.innerHTML = teddyBasketText
        teddyBasketCount.appendChild(teddyBasketLink)
    }else{
        teddyBasketLink.setAttribute("title" ,"Il n'y a aucune adoption en attente !")
        const teddyBasketText = `Panier`
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
            <div class="card-footer bg-light">
                <h6>Récapitulatif de votre commande :</h6>
                <div class="row">
                    <div class="col-sm-4 col-md-3">Numéro :</div>
                    <div class="col user-select-all"><small>${numeroCommande}</small></div>
                </div>
                <div class="row">
                    <div class="col-sm-4 col-md-3">Montant :</div>
                    <div class="col"><small>${montantCommande}.00 €</small></div>
                </div>
            </div>
        </div>`
    recapDiv.innerHTML = recapDivText
    recapitulatifCommande.appendChild(recapDiv)
