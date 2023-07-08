/**
 * Tire au sort une destination et l'active
 */
const activeUneDestination = function() {
    let touteLesDestinations = Array.from(DESTINATIONS);
    let tirage = Math.floor(Math.random()*touteLesDestinations.length);
    touteLesDestinations[tirage].dataset.destination = 'actif';
}

activeUneDestination();



/**
 * Dessine la cargaison
 */
const dessineGargaison = function(nbConteneur) {

    let h = (nbConteneur * SPRITE.CONTENEUR.H ) - (2.5 * SPRITE.CONTENEUR.H);

    CARGAISON.setAttribute('width', SPRITE.CONTENEUR.W);
    CARGAISON.setAttribute('height', SPRITE.CONTENEUR.H * nbConteneur);
    CARGAISON.setAttribute('style', `bottom:${SPRITE.CONTENEUR.H}px;`);

    const 
        CTX = CARGAISON.getContext('2d'),
        IMG = new Image();

        IMG.onload = () => {
            for (let i = 0; i < nbConteneur; i++) {
                CTX.drawImage(
                    IMG, // image
                    SPRITE.CONTENEUR.X, // source x
                    SPRITE.CONTENEUR.Y, // source y
                    SPRITE.CONTENEUR.W, // source width
                    SPRITE.CONTENEUR.H, // source height
                    0,  // target x
                    i * SPRITE.CONTENEUR.H, // target y
                    SPRITE.CONTENEUR.W, // target width
                    SPRITE.CONTENEUR.H // target height
                );
            }
    };
    IMG.src = SPRITE.SRC;

};

dessineGargaison(partie.nombreConteneur - 1);
