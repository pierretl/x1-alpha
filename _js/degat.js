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
 * Stop l'animation
 */
let stopAnimationExplosion = function() {
    clearInterval(tID);
}



/**
 * Initialisation
 */
let tID;

