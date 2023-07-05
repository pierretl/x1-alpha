let destinationsActive = [];
let touteLesDestinations = Array.from(DESTINATIONS);


/**
 * Sélectionne autant de destination que de conteneur dans la partie, 
 * sinon chamge le nombre de conteneur par rapport au nombre destination 
 */
if (partie.nombreConteneur <= DESTINATIONS.length) {

    for (let index = 0; index < partie.nombreConteneur; index++) {

        let tirage = Math.floor(Math.random()*touteLesDestinations.length)
    
        destinationsActive[index] = touteLesDestinations[tirage];
    
        touteLesDestinations.splice(tirage,1);
        
    }

} else {
    destinationsActive = touteLesDestinations;
    partie.nombreConteneur = DESTINATIONS.length;
}



/**
 * Active les destinations sélectionner
 */
destinationsActive.forEach(function(destinationActive){
    destinationActive.dataset.destination = 'actif';
});