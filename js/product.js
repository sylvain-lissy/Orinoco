//récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

fetch("http://localhost:3000/api/teddies/" + id)
  .then(reponse => reponse.json())
  .then(reponse => {
    console.log(reponse)
    //Construction H2 au nom du teddy
    const nameTeddy = document.getElementById("namingteddy")
    const h2Name = document.createElement("h2")
    h2Name.classList.add("h1", "text-center", "text-primary")
    const h2Text = `${reponse.name}`
    h2Name.innerHTML = h2Text
    nameTeddy.appendChild(h2Name)
    
       
    //Construction DIV fiche produit teddy
    const cardTeddy = document.getElementById("adoptteddy")
    const divCard = document.createElement("div")
    divCard.classList.add("col-12", "col-md-8", "col-lg-6", "mb-3")
    const divCardText = `
        <div class="card mb-4 mb-lg-0 border-primary shadow">
            <img src="${reponse.imageUrl}" alt="${reponse.name}" class="card-img-top">
            <h5 class="card-header text-center">${reponse.name}</h5>
            <div class="card-body">
                <h6 class="card-title">${reponse.description}</h6>
                <hr>
                <form id="AddToBasket">
                    <div class="form-group row text-center input-group is-invalid m-0 py-0 pb-3">
                        <select class="form-control-sm col-7 p-0" id="ListOfColor" required>
                            <!--<option selected disabled value="">Choisir une couleur</option>-->
                        </select>
                        <p class="card-text col-5 text-right font-weight-bold pr-0 pl-1">Prix : ${reponse.price / 100}.00 €</p>  
                    </div>
                    <button type="submit" name="add" id="submit" class="btn btn-sm btn-outline-primary btn-block">Adopter ${reponse.name} ?</button
                </form>
            </div>
        </div>`
    divCard.innerHTML = divCardText
    cardTeddy.appendChild(divCard)
    

    //Construction du choix des couleurs
    const colors = reponse.colors;
    const mainOption = document.getElementById("ListOfColor")
    colors.forEach(element => {
      const selectOption = document.createElement("option")
      selectOption.setAttribute("value", element);
      const textOption = `${element}`
      selectOption.innerHTML = textOption
      mainOption.appendChild(selectOption)
    });

    //Ajout au panier 
    const addTeddy = document.getElementById("submit")
    addTeddy.addEventListener("click", function (event) {
        event.preventDefault();
        // stockage des données du/des teddy souhaité dans localStorage
        let TeddyAdopter = {
            name: reponse.name,
            color: ListOfColor.value,
            id: reponse._id,
            quantity: 1,
            price: reponse.price / 100,
        };
        console.log(TeddyAdopter);

        TeddyAuPanier = JSON.parse(localStorage.getItem('AdoptionTeddy'));
                const teddyColor = ListOfColor.value;
                if(TeddyAuPanier) {
                    TeddyAuPanier.push(TeddyAdopter);
                    localStorage.setItem('AdoptionTeddy', JSON.stringify(TeddyAuPanier));
                    console.log(TeddyAuPanier);
                //Afficher le messag d'ajout au panier
                    // if (window.confirm(reponse.name + " au coloris " + ListOfColor.value + ' a bien été adopté. Souhaitez vous consulter votre panier ?')) { 
                    //     window.location.href = "basket.html";
                    // } else {
                    //     window.location.href = "index.html";
                    // }
                } else {
                    TeddyAuPanier = [];
                    TeddyAuPanier.push(TeddyAdopter);
                    localStorage.setItem('AdoptionTeddy', JSON.stringify(TeddyAuPanier));
                    console.log(TeddyAuPanier);
                //Afficher le messag d'ajout au panier
                    // if (window.confirm(reponse.name + " " + ListOfColor.value + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                    //     window.location.href = "basket.html";
                    // } else {
                    //     window.location.href = "index.html";
                    // }
                }
            })
        })