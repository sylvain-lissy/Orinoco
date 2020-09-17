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

//récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
//console.log(id);
if (id === null) {window.location.href ="index.html"}
//Connection à la base de données
fetch("http://localhost:3000/api/teddies/" + id)
  .then(teddySelected => teddySelected.json())
  .then(teddySelected => {
    //console.log(teddySelected)
    //Construction H2 au nom du teddy
    const teddyName = document.getElementById("teddyName")
    const h2Name = document.createElement("h2")
    h2Name.classList.add("h1", "text-center", "text-primary")
    const h2Text = `${teddySelected.name}`
    h2Name.innerHTML = h2Text
    teddyName.appendChild(h2Name)
    //Construction DIV fiche produit teddy
    const teddyCard = document.getElementById("teddyCard")
    const divCard = document.createElement("div")
    divCard.classList.add("col-12", "col-md-8", "col-lg-6", "mb-3")
    const divCardText = `
        <div class="card mb-4 mb-lg-0 border-primary shadow">
            <img src="${teddySelected.imageUrl}" alt="${teddySelected.name}" class="card-img-top" data-toggle="modal" data-target="#teddyZoomModal">
            <h5 class="card-header text-center">${teddySelected.name}</h5>
            <div class="card-body">
                <h6 class="card-title">${teddySelected.description}</h6>
                <hr>
                <form id="AddToBasket">
                    <div class="form-group row text-center input-group is-invalid m-0 py-0 pb-3">
                        <select class="form-control-sm col-7 p-0" id="teddyColor" required>
                        </select>
                        <p class="card-text col-5 text-right font-weight-bold pr-0 pl-1">Prix : ${teddySelected.price / 100}.00 €</p>  
                    </div>
                    <button type="submit" name="add" id="submit" class="btn btn-sm btn-success btn-block">Adopter ${teddySelected.name} ?</button>
                </form>
            </div>
        </div>`
    divCard.innerHTML = divCardText
    teddyCard.appendChild(divCard)
    //Construction Zoom Modal
    const teddyZoom = document.getElementById("teddyZoomModal")
    const divZoom = document.createElement("div")
    divZoom.classList.add("modal-dialog", "modal-xl")
    const divZoomText=`
        <div class="modal-content">
            <div class="modal-body">
                <img src="${teddySelected.imageUrl}" class="w-100">
            </div>
        </div>`
    divZoom.innerHTML = divZoomText
    teddyZoom.appendChild(divZoom)
    //Construction du choix des couleurs
    const teddyColors = teddySelected.colors
    const teddyColor = document.getElementById("teddyColor")
    teddyColors.forEach(color => {
      const colorOption = document.createElement("option")
      colorOption.setAttribute("value", color)
      const textOption = `${color}`
      colorOption.innerHTML = textOption
      teddyColor.appendChild(colorOption)
    })
    //Ajout au panier 
    const addTeddyToLocalStorage = document.getElementById("submit")
    addTeddyToLocalStorage.addEventListener("click", function (event) {
        event.preventDefault()
        //D'abord afficher l'alerte
        $('#teddyAlertMessage').modal('show')
            //Creer l'ajout dans localstorage
            teddyAdopter = {teddyName: teddySelected.name, 
                            teddyColor: teddyColor.value, 
                            teddyId: teddySelected._id, 
                            teddyQuantity: 1, 
                            teddyPrice: teddySelected.price / 100,
                            teddyImageUrl: teddySelected.imageUrl
            }
            //console.log(teddyAdopter)
        //Creation message pour l'alerte
        const teddyAlertMessage = document.getElementById("teddyAlertMessage")
        const teddyAlertMessageP = document.createElement("div")
        teddyAlertMessageP.classList.add("modal-dialog")
        const teddyAlertMessageT = `
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="teddyAlertMessageModalTitle">Adoption de ${teddySelected.name}</h5>
          </div>
          <div class="modal-body">
          <img src="${teddySelected.imageUrl}"  alt="${teddySelected.name}" class="w-100">
          <hr>
          Vous avez décidé d'adopter <strong>${teddySelected.name}</strong>
          qui sera de couleur <strong>${teddyColor.value}</strong>
          pour un montant de <strong>${teddySelected.price / 100}.00 €</strong>
          </div>
          <div class="modal-footer">
              <div class="row w-100 justify-content-spacebetween">
                  <div class="col-6"><a href="index.html" class="btn btn-success btn-block" id="continuerAdoption">Continuer d'adopter</a></div>
                  <div class="col-6"><a href="basket.html" class="btn btn-success btn-block" id="finaliserAdoption">Voir mes adoptions</a></div>
              </div>
          </div>
        </div>`
        teddyAlertMessageP.innerHTML = teddyAlertMessageT
        teddyAlertMessage.appendChild(teddyAlertMessageP)
        //Ensuite au click 1 stocker puis retour accueil
        const addTeddyGoIndex = document.getElementById("continuerAdoption")
            addTeddyGoIndex.addEventListener("click", function (event) {
            event.preventDefault()
            teddyAuPanier = JSON.parse(localStorage.getItem('adoptionTeddies'))
            if(teddyAuPanier) {
                teddyAuPanier.push(teddyAdopter)
                localStorage.setItem('adoptionTeddies', JSON.stringify(teddyAuPanier))
                //console.log(teddyAuPanier);
                window.location.href ="index.html"
            }else{
                teddyAuPanier = []
                teddyAuPanier.push(teddyAdopter)
                localStorage.setItem('adoptionTeddies', JSON.stringify(teddyAuPanier))
                //console.log(teddyAuPanier)
                window.location.href ="index.html"                
            }
        })
        const addTeddyGoBasket = document.getElementById("finaliserAdoption")
            addTeddyGoBasket.addEventListener("click", function (event) {
            event.preventDefault()
            teddyAuPanier = JSON.parse(localStorage.getItem('adoptionTeddies'))
            //const teddyColor = teddyColor.value
            if(teddyAuPanier) {
                teddyAuPanier.push(teddyAdopter)
                localStorage.setItem('adoptionTeddies', JSON.stringify(teddyAuPanier))
                //console.log(teddyAuPanier)
                window.location.href ="basket.html"
            }else{
                teddyAuPanier = []
                teddyAuPanier.push(teddyAdopter)
                localStorage.setItem('adoptionTeddies', JSON.stringify(teddyAuPanier))
                //console.log(teddyAuPanier)
                window.location.href ="basket.html"                
            }
        })
    })
})