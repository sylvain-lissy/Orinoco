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

//Connection à la base de données
fetch("http://localhost:3000/api/teddies")
  //Formatage reponse au format JSON
  .then(teddiesList => teddiesList.json())
  // Recuperation du JSON tableau des oursons //
  .then(teddiesList => {
    //console.log(teddiesList)
    //Creation du tableau des teddies
    const mainTeddy = document.getElementById("teddies_list")
    teddiesList.forEach(teddyList => {
      const divTeddy = document.createElement("div")
      divTeddy.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
      const text = `            
        <div class="card mb-4 mb-lg-0 border-primary shadow">
          <img src="${teddyList.imageUrl}" alt="${teddyList.name}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${teddyList.name}</h5>
            <p class="card-text">Prix : ${teddyList.price / 100}.00 €</p>
            <a href="product.html?id=${teddyList._id}" class="btn btn-outline-primary btn-block stretched-link">Adopter ${teddyList.name} ?</a>
          </div>
        </div>`
      divTeddy.innerHTML = text
      mainTeddy.appendChild(divTeddy)
    })
  })