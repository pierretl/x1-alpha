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



/**
 * Relancer le jeu apres la pause
 */
BTN_RELANCER.addEventListener('click', function() {
    DIALOG_SATUT.close();
    partie.statut = 'start';
});



/**
 * Commencer un nouvelle partie
 */
BTN_REJOUER.addEventListener('click', function() {
    DIALOG_START.showModal();
    DIALOG_SATUT.close();
});





/**
 * Commencer un nouvelle partie
 */
FORM_PARTIE.addEventListener("submit", (event) => {
    event.preventDefault();
    DIALOG_START.close();
    DIALOG_SATUT.close();
    vaisseau.element.removeAttribute('style');
    vaisseau.reacteur.removeAttribute('style');
    vaisseau.pince.removeAttribute('style');
    vaisseau.boom.removeAttribute('style');
    JAUGE.removeAttribute('style');
    CONTENEUR.querySelector('.conteneur').removeAttribute('style');
    DESTINATIONS.forEach(function(destination){
        destination.querySelector('.conteneur').classList.add('hide');
    });
    DIALOG_SECTION_WIN.classList.add('hide');
    partie.nombreConteneur = difficulter.value;
    dessineGargaison(partie.nombreConteneur - 1);
    partie.statut = 'start';
    vaisseau.degat = 0;
    vaisseau.x = 50;
    vaisseau.y = 100;
    vaisseau.cargaison = false;
    activeUneDestination();
    deplaceVaisseau();
    gravite.start();
});



/**
 * Pause
 */
let gamePause = function() {
    activePause();
    hideStatutSection();
    DIALOG_SECTION_PAUSE.classList.remove('hide');
}



/**
 * Gagné
 */
let gameWin = function() {
    activePause();
    hideStatutSection();
    DIALOG_SECTION_WIN.classList.remove('hide');
}



/**
 * Perdu
 */
let gameLoose = function() {
    activePause();
    hideStatutSection();
    DIALOG_SECTION_LOOSE.classList.remove('hide');
}



/**
 * Active la pause
 */
let activePause = function() {
    partie.statut = 'pause';
    DIALOG_SATUT.showModal();
    DIALOG_START.close();
}



/**
 * masque tous les messages de statut
 */
let hideStatutSection = function() {
    DIALOG_SECTION_WIN.classList.add('hide');
    DIALOG_SECTION_PAUSE.classList.add('hide');
    DIALOG_SECTION_LOOSE.classList.add('hide');
}

