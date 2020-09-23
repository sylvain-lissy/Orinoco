//appel de la fonction Compteur du panier de la navbar
CompteurPanierNavBar()
// récupération de l'id de la commande
const numeroCommande = localStorage.getItem('numeroCommande');
// récupération du prix total de la commande
const montantCommande = localStorage.getItem('montantCommande');
//Si aucunes données dans le localstorage alors on redirige vers l'accueil
if (!numeroCommande && !montantCommande){window.location.href= "index.html"}
//Construction DIV récapitulatif de commande
const recapitulatifCommande = document.getElementById("recapitulatifCommande")
const recapDiv = document.createElement("div")
recapDiv.classList.add("col-12", "col-md-8", "col-lg-6", "mb-3")
recapDiv.innerHTML = `
    <div class="card mb-4 mb-lg-0 border-primary shadow">
        <img src="img/happyTeddy.jpg" class="w-50 align-self-center">
        <h3 class="card-header text-center h5">Merci de votre confiance !</h3>
        <div class="card-body">
            <!--<img src="img/sadTeddy.jpg" class="img-fluid">-->
            <h4 class="h6">Nous vous confirmons votre adoption.</h4>
            <p>Toute l'équipe d'Ori-Bears vous remercie  pour votre geste.</p>
            <p>Vos petits oursons arriveront très prochainement chez vous.</p>
            <h4 class="h6">En espérant vous revoir bientôt :)</h4>
        </div>
        <div class="alert alert-success rounded-0">
            <h4 class="h6" class="alert-heading">Récapitulatif de votre commande :</h4>
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
recapitulatifCommande.appendChild(recapDiv)
//on vide le localstorage
localStorage.clear()