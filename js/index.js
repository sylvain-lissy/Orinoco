//appel de la fonction Compteur du panier de la navbar
CompteurPanierNavBar()

//Connection à la base de données
fetch("http://localhost:3000/api/teddies")
    //Formatage reponse au format JSON
    .then(teddiesList => teddiesList.json())
    // Recuperation du JSON tableau des oursons //
    .then(teddiesList => {
      //console.log(teddiesList)
      tableauTeddies(teddiesList)
    })
    //Gestion d'erreur
    .catch (function(error){
      gestionErreurMessage(error)
    })