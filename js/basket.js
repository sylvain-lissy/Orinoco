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
        const teddyBasketNoneContent = `<div class="col">Votre panier est tristement vide :(</div>`
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
            //divTeddyItem.setAttribute("id", i)
            //console.log(teddyItem[i])
            const teddyBasketItemContent = `            
                    <div class="col-2 p-1 d-none d-sm-block"><img src="${teddyItem.teddyImageUrl}" alt="${teddyItem.teddyName}" class="w-100 m-1"></div>
                    <div class="col-5 col-md-4 p-1" id=QuantityName>1x ${teddyItem.teddyName}</div>
                    <div class="col-4 col-md-3 p-1" id="Color">${teddyItem.teddyColor}</div>
                    <div class="col-2  p-1" id="Price">${teddyItem.teddyPrice} €</div>
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
                localStorage.removeItem('adoptionTeddies') 
                window.location.href ="basket.html"
        })


    } 
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
                // //on réécris le nouveau localstorage
                localStorage.setItem('adoptionTeddies', JSON.stringify(teddyBasket))
                JSON.parse(localStorage.getItem('adoptionTeddies'))
                // //on alerte et redirige
                // //alert('Cet article a bien été supprimé !')
                window.location.href = "basket.html"
            })
        })
    }

    //Céation du formulaire pour passer commande
    //Afficher la modal du formulaire
    const ValiderAdoption = document.getElementById("ValiderAdoption")
    ValiderAdoption.addEventListener("click", function (event) {
            event.preventDefault()
            $('#FormCommand').modal('show')      
    })
    // Verification validité prénom, nom, ville
    function valideDivers(value) { return /^[A-Z-a-z\s]{3,40}$/.test(value)}
    // Verification validité adresse
    function valideAdresse(value) { return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)}
    // Verification validité mail
    function valideEmail(value) { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)}
    // Verification validité code postal
    function valideCodePostal(value) { return /^[0-9\s]{5,5}$/.test(value)}
    // Vérification de la validité du nom
    const nom = document.getElementById("formNom")
    nom.addEventListener("change", function (event) {
        if (valideDivers(nom.value)) {
            alert( "OK!")  
        } else {
            alert( "Erreur de nom!")
            event.preventDefault()
        }
    })
    // Vérification de la validité du prenom
    const prenom = document.getElementById("formPrenom")
    prenom.addEventListener("change", function (event) {
        if (valideDivers(prenom.value)) {
            alert( "OK!")
        } else {
            event.preventDefault()
        }
    });
    // Vérification de la validité de l'adresse
    const adresse = document.getElementById("formAdresse")
    adresse.addEventListener("change", function (event) {
        if (valideAdresse(adresse.value)){
            alert( "OK!")
        } else {
            alert( "Erreur d'adresse!")
            event.preventDefault()
        }
    });
    // Vérification de la validité du code postal
    const codepostal = document.getElementById("formCodePostal")
    codepostal.addEventListener("change", function (event) {
        if (valideCodePostal(codepostal.value)) {
            alert( "OK!")
        } else {
            alert( "Erreur de code postal!")
            event.preventDefault()
        }
    });
    // Vérification de la validité de la ville
    const ville = document.getElementById("formVille")
    ville.addEventListener("change", function (event) {
        if (valideDivers(ville.value)) {
            alert( "OK!")
        } else {
            alert( "Erreur de ville!")
            event.preventDefault()
        }
    });
    // Vérification de la validité du mail
    const email = document.getElementById("formEmail")
    email.addEventListener("change", function (event) {
        if (valideEmail(email.value)){
            alert( "OK!")
        } else {
            alert( "Erreur d'email!")
            event.preventDefault()
        }
    });
    //Si tout est correctement rempli alors on passe à la commande
    const ValidateCommand = document.getElementById("ValiderCommande")
    ValidateCommand.addEventListener("click", function (event) {
        if(     valideDivers(nom.value) && 
                valideDivers(prenom.value) && 
                valideAdresse(adresse.value) && 
                valideCodePostal(codepostal.value) && 
                valideDivers(ville.value) && 
                valideEmail(email.value)){    
            event.preventDefault();
            //on créer un total
            localStorage.setItem('totalPrice', teddyTotalBasket);
            const storagePrice = localStorage.getItem('totalPrice');
            console.log(storagePrice);
            //on crée un contact
            let contact = {
                Nom: nom.value,
                Prenom: prenom.value,
                Adresse: adresse.value,
                CodePostal: codepostal.value,
                Ville: ville.value,
                Email: email.value
            }
            console.log(contact);
            //on crée la liste
            let products = [];
            for (storedTeddy of teddyBasket) {
                let productsId = storedTeddy.teddyId;
                products.push((productsId));
            }
            console.log(products);
            //on rassemble le tout
            let send = {
                contact,
                products,
            }
            console.log(send);
            // on envoie
            const post = async function (data){
                try {
                    let response = await fetch('http://localhost:3000/api/teddies/order', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if(response.ok) {
                        let data = await response.json();
                        console.log(data.orderId);
                        localStorage.setItem("responseOrder", data.orderId);
                        window.location = "confirmation.html";
                        localStorage.removeItem("newArticle");

                    } else {
                        event.preventDefault();
                        console.error('Retour du serveur : ', response.status);
                        alert('Erreur rencontrée : ' + response.status);
                    } 
                } catch (error) {
                    alert("Erreur : " + error);
                } 
            };
            post(send);
        }
    })