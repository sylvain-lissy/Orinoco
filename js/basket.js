//appel de la fonction Compteur du panier de la navbar
CompteurPanierNavBar()

//Construction H2 au nom du teddy
const teddyBasket = JSON.parse(localStorage.getItem('adoptionTeddies'))
const teddyName = document.getElementById("teddyH2Count")
const h2Name = document.createElement("h2")
h2Name.classList.add("h3", "text-center", "text-primary")
if (teddyBasket){
    if (teddyBasket.length > 1) {
        const h2Text = `Vous avez choisi ${teddyBasket.length} oursons.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
        ConstrusctionDuPanier()
    } else if (teddyBasket.length == 1) {
        const h2Text = `Vous avez choisi ${teddyBasket.length} ourson.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
        ConstrusctionDuPanier()
    }
} else {
    const h2Text = `Vous n'avez pas choisi d'ourson.`
    h2Name.innerHTML = h2Text
    teddyName.appendChild(h2Name)
    //Construction d'un panier vide...
    const teddyBasketNone = document.getElementById("teddiesBasketList")
    const divTeddyItemNone = document.createElement("div")
    divTeddyItemNone.classList.add("row", "p-0", "m-0", "align-items-center")
    const teddyBasketNoneContent = `
        <div class="col text-center">
        <img src="img/sadTeddy.jpg" class="img-fluid">
        <p>Votre panier est vide... </p>
        <a href="index.html" class="btn btn-primary btn-block stretched-link">revenir à l'accueil</a>
        </div>`
    divTeddyItemNone.innerHTML = teddyBasketNoneContent
    teddyBasketNone.appendChild(divTeddyItemNone)
}

//Construction du panier
function ConstrusctionDuPanier(){
    i = 0
    teddyTotalBasket = 0
    const teddyBasketItem = document.getElementById("teddiesBasketList")
    teddyBasket.forEach(teddyItem => {
        const divTeddyItem = document.createElement("div")
        divTeddyItem.classList.add("row", "p-0", "m-1", "bg-light", "justify-content-between", "align-items-center")
        //console.log(teddyItem[i])
        const teddyBasketItemContent = `            
                <div class="col-2 p-1 d-none d-sm-block"><img src="${teddyItem.teddyImageUrl.slice(-18)}" alt="${teddyItem.teddyName}" class="w-100 m-1"></div>
                <div class="col-5 col-md-4 p-1">1x ${teddyItem.teddyName}</div>
                <div class="col-4 col-md-3 p-1">${teddyItem.teddyColor}</div>
                <div class="col-2  p-1">${teddyItem.teddyPrice} €</div>
                <div class="col-1  p-1 RemoveBtn" id="${i}">
                    <button type="button" class="close text-danger" aria-label="Supprimer">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
        divTeddyItem.innerHTML = teddyBasketItemContent
        teddyBasketItem.appendChild(divTeddyItem)
        i++
        teddyTotalBasket= teddyTotalBasket + teddyItem.teddyPrice   
    })
    //Afficher le total du panier
    const teddyBasketTotal = document.getElementById("teddiesBasketTotal")
        const divTeddyBasketTotal = document.createElement("div")
        divTeddyBasketTotal.classList.add("row", "p-0", "m-1", "align-items-center")
        const teddyBaskettotalContent = `
                <div class="col-6 p-0 m-0">pour un total de </div>
                <div class="col-6 p-0 m-0 text-right">${teddyTotalBasket}.00 €</div>`
        divTeddyBasketTotal.innerHTML = teddyBaskettotalContent
        teddyBasketTotal.appendChild(divTeddyBasketTotal)
    //Bouton du panier pour valider ou vider
        const divTeddyBasketButtons = document.createElement("div")
        divTeddyBasketButtons.classList.add("row", "p-0", "m-1", "mt-3", "w-100", "justify-content-between", "flex-column", "flex-md-row")
        divTeddyBasketButtons.setAttribute("id", ConfirmDeleteBasket)
        const teddyBasketButtonContent = `
                <div class="col-sm-12 col-md-6 p-1"><a href="#" class="btn btn-success btn-block" id="ValiderAdoption">Valider les adoptions</a></div>
                <div class="col-sm-12 col-md-6 p-1"><a href="#" class="btn btn-danger btn-block" id="SupprimerAdoption">Annuler les adoptions</a></div>`
        divTeddyBasketButtons.innerHTML = teddyBasketButtonContent
        teddyBasketTotal.appendChild(divTeddyBasketButtons)
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
            localStorage.clear() 
            window.location.href ="basket.html"
    }) 
    //Supprimer un seul Teddy
    // on récupére l'article associé au bouton poubelle
    const RemoveBtn = document.getElementsByClassName('RemoveBtn')
    for (let i = 0; i < RemoveBtn.length; i++) {
        //Afficher la demander "Supprimer le Teddy"
        RemoveBtn[i].addEventListener('click', function (event) {
            event.preventDefault()
            const DeleteId = this.closest('.RemoveBtn').id
            $('#DeleteTeddy').modal('show')
            const ConfirmDeleteTeddy = document.getElementById("ConfirmDeleteTeddy")
            ConfirmDeleteTeddy.addEventListener("click", function (event) {
                //on supprime l'article du localStorage
                teddyBasket.splice(DeleteId, 1)
                //on réécris le nouveau localstorage
                localStorage.setItem('adoptionTeddies', JSON.stringify(teddyBasket))
                JSON.parse(localStorage.getItem('adoptionTeddies'))
                //si c'est le dernier article, on supprime le localstorage
                if (RemoveBtn.length === 1) { localStorage.removeItem("adoptionTeddies") }
                //on recharge la page
                window.location.href = "basket.html"
            })
        })
    }
    //Création du formulaire pour passer commande
    //Afficher la modal du formulaire
    const ValiderAdoption = document.getElementById("ValiderAdoption")
    ValiderAdoption.addEventListener("click", function (event) {
            event.preventDefault()
            $('#FormCommand').modal('show')      
    })
    // Vérification de la validité du nom
    const nom = document.getElementById("formNom")
    nom.addEventListener("change", function (event) {
        if (valideDivers(nom.value)) {
        } else {
            // alert( "Erreur de nom!")
            event.preventDefault()
        }
    })
    // Vérification de la validité du prenom
    const prenom = document.getElementById("formPrenom")
    prenom.addEventListener("change", function (event) {
        if (valideDivers(prenom.value)) {
        } else {
            // alert( "Erreur de prénom!")
            event.preventDefault()    
        }
    });
    // Vérification de la validité de l'adresse
    const adresse = document.getElementById("formAdresse")
    adresse.addEventListener("change", function (event) {
        if (valideAdresse(adresse.value)){
        } else {
            // alert( "Erreur d'adresse!")
            event.preventDefault()
        }
    });
    // Vérification de la validité de la ville
    const ville = document.getElementById("formVille")
    ville.addEventListener("change", function (event) {
        if (valideDivers(ville.value)) {
        } else {
            // alert( "Erreur de ville!")
            event.preventDefault()
        }
    });
    // Vérification de la validité du mail
    const email = document.getElementById("formEmail")
    email.addEventListener("change", function (event) {
        if (valideEmail(email.value)){
        } else {
            // alert( "Erreur d'email!")
            event.preventDefault()
        }
    });
    //Si tout est correctement rempli alors on passe à la commande
    const ValidateCommand = document.getElementById("ValiderCommande")
    ValidateCommand.addEventListener("click", function (event) {
        event.preventDefault();
        if(     valideDivers(nom.value) && 
                valideDivers(prenom.value) && 
                valideAdresse(adresse.value) && 
                valideDivers(ville.value) && 
                valideEmail(email.value)){    
            //on créer un total
            localStorage.setItem('montantCommande', teddyTotalBasket);
            const montantCommande = localStorage.getItem('montantCommande');
            //console.log(montantCommande);
            //on crée un contact
            const contact = {
                lastName: nom.value,
                firstName: prenom.value,
                address: adresse.value,
                city: ville.value,
                email: email.value
            }
            //console.log(contact);
            //on crée la liste
            const products = [];
            for (storedTeddy of teddyBasket) {
                const productsId = storedTeddy.teddyId;
                products.push((productsId));
            }
            //console.log(products);
            //on rassemble le tout
            const infosCommande = {contact, products }
            // on envoie
            const envoieCommande = async function (numeroCommande){
                try {
                    const retourServeur = await fetch("http://localhost:3000/api/teddies/order", {
                        method: "POST",
                        body: JSON.stringify(numeroCommande),
                        headers: {"Content-Type": "application/json"}
                    })
                    if(retourServeur.ok) {
                        const numeroCommande = await retourServeur.json()
                        //console.log(numeroCommande.orderId)
                        localStorage.setItem("numeroCommande", numeroCommande.orderId)
                        window.location = "confirm.html"
                        localStorage.removeItem("adoptionTeddies")
                    } else {
                        event.preventDefault()
                        //alert("1er Erreur : " + retourServeur.status + ': ' + retourServeur.statusText)    
                        gestionErreurMessage(retourServeur.status + ': ' + retourServeur.statusText)
                    } 
                } catch (error) {
                    //alert("2nd Erreur : " + error)
                    gestionErreurMessage(error)
                } 
            }
            envoieCommande(infosCommande)
        }else{
            //console.log('Commande non-envoyée')   
            //modal erreur
            $('#erreurFormulaire').modal('show') 
        }
    })
}