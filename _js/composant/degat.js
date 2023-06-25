/**
 * Ajoute des degats au vaisseau si obstacle est affectant et retire une vie 
 * 
 * @param {object} vaisseau
 * @param {HTMLElement} obstacle
 */
let infligeDegat = function(vaisseau, obstacle) {

    if (Math.round(vaisseau.degat) >= 100) {
        if (vaisseau.vie > 0) {
            animationExplosion();
            vaisseau.vie--;
        }
        return false;
    }

    if (obstacle.hasAttribute('data-degat')) {
        vaisseau.degat += 1 / vaisseau.vitesse;
        animationDegat();
        JAUGE.style.clipPath = `polygon(0 0, ${vaisseau.degat}% 0, ${vaisseau.degat}% 100%, 0 100%)`;
    } 
}



/**
 * Animation de l'explosion et de la disparaition du vaisseau et réacteur
 */
let animationExplosion = function() {
    let position = SPRITE.EXPLOSION.Y;
    const 
        INTERVAL = 100,
        ETAPE_TOTAL = 9,
        ETAPE_VAISSEAU_CACHE = 5,
        DIFF = vaisseau.boom.clientHeight;

    tID = setInterval(() => {

        vaisseau.boom.style.backgroundPosition = `-${SPRITE.EXPLOSION.X}px -${position}px`;

        if (position < ETAPE_TOTAL * DIFF) {

            position = position + DIFF;

            if (position > ETAPE_VAISSEAU_CACHE * DIFF) {
                vaisseau.element.style.backgroundImage = 'none';
                vaisseau.reacteur.style.backgroundImage = 'none';
            }
        } else {

            stopAnimationExplosion();
            vaisseau.boom.style.backgroundPosition = `-${SPRITE.EXPLOSION.X}px -${SPRITE.EXPLOSION.Y}px`;

        }

    }, INTERVAL);
}



/**
 * Animation de dégat
 */
let animationDegat = function() {
    let position = SPRITE.DEGAT.Y;
    const 
        INTERVAL = 100,
        ETAPE_TOTAL = 4,
        DIFF = vaisseau.element.clientHeight;

    tID2 = setInterval(() => {

        vaisseau.element.style.backgroundPosition = `-${SPRITE.DEGAT.X}px -${position}px`;

        if (position < ETAPE_TOTAL * DIFF) {

            position = position + DIFF;

        } else {

            stopAnimationDegat();
            vaisseau.element.style.backgroundPosition = `-${SPRITE.DEGAT.X}px -${SPRITE.DEGAT.Y}px`;

        }

    }, INTERVAL);
}


/**
 * Stop les animations
 */
let stopAnimationExplosion = function() {
    clearInterval(tID);
}
let stopAnimationDegat = function() {
    clearInterval(tID2);
}



/**
 * Initialisation
 */
let tID, tID2;

