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
    //Construction H2 au nom du teddy
    const teddyName = document.getElementById("teddyH2Count")
    const h2Name = document.createElement("h2")
    h2Name.classList.add("h1", "text-center", "text-primary")
    if (teddyBasket){
        if (teddyBasket.length > 1) {
            const h2Text = `Vous avez choisi ${teddyBasket.length} oursons.`
            h2Name.innerHTML = h2Text
            teddyName.appendChild(h2Name)
        } else if (teddyBasket.length == 1) {
            const h2Text = `Vous avez choisi ${teddyBasket.length} ourson.`
            h2Name.innerHTML = h2Text
            teddyName.appendChild(h2Name)
        }
    } else {
        const h2Text = `Vous n'avez pas choisi d'ourson.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
    }
    //Construction du panier
    const teddyBasketItem = document.getElementById("teddiesBasketList")
    teddyBasket.forEach(teddyItem => {
      const divTeddyItem = document.createElement("div")
      divTeddyItem.classList.add("row", "p-0", "m-1", "bg-light", "align-items-center")
      //divTeddyItem.setAttribute("id", teddyItem.count)
      const teddyBasketItemContent = `            
            <div class="col-2 d-none d-sm-block"><img src="${teddyItem.teddyImageUrl}" alt="${teddyItem.teddyName}" class="w-100 m-1"></div>
            <div class="col-4" id="Quantité et nom">1x ${teddyItem.teddyName}</div>
            <div class="col-3"id="Coloris">${teddyItem.teddyColor}</div>
            <div class="col-2"id="Prix">${teddyItem.teddyPrice} €</div>
            <div class="col-1"id="Bouton supprimer">
                <button type="button" class="close text-danger" aria-label="Supprimer">
                    <span aria-hidden="true">&times;</span>
                    </button>
            </div>`
      divTeddyItem.innerHTML = teddyBasketItemContent
      teddyBasketItem.appendChild(divTeddyItem)
    })
    //Afficher la demander "Vider le panier"
    const DeleteBasket = document.getElementById("SupprimerAdoption")
    DeleteBasket.addEventListener("click", function (event) {
            event.preventDefault()
            $('#EmptyBasket').modal('show')      
    })
    //Confirmer et vider le panier
    const ConfirmEmptyBasket = document.getElementById("ConfirmDeleteBasket")
    ConfirmEmptyBasket.addEventListener("click", function (event) {
            event.preventDefault()
            localStorage.removeItem('adoptionTeddies') 
            window.location.href ="basket.html"
    })