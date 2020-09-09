fetch("http://localhost:3000/api/teddies")
    .then(reponse => reponse.json())
    .then(reponse => {
        console.log (reponse)
        const main = document.getElementById("teddies_list")
        reponse.forEach(element => {
            const newdiv = document.createElement("div")
            newdiv.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
            const text=`            
            <div class="card mb-4 mb-lg-0 border-primary shadow">
              <img src="${element.imageUrl}" alt="${element.name}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">Prix : ${element.price /100}.00 €</p>
                <a href="product.html?id=${element._id}" class="btn btn-outline-primary btn-block stretched-link">Envie d'adopter ${element.name} ?</a>
              </div>
            </div>`
          newdiv.innerHTML = text
        main.appendChild(newdiv)    
        });
    })