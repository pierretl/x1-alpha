/**
 * Ajoute des degats au vaisseau si obstacle est affectant et retire une vie 
 * 
 * @param {object} vaisseau
 * @param {HTMLElement} obstacle
 */
let infligeDegat = function(vaisseau, obstacle) {

    if (Math.round(vaisseau.degat) >= 100) {
        if (vaisseau.vie > 0) {

            const EMITTER_EXPLOSION = new EventEmitter();
            animationSprite(
                vaisseau.boom,
                SPRITE.EXPLOSION.X,
                SPRITE.EXPLOSION.Y,
                vaisseau.boom.clientHeight,
                10,
                500,
                EMITTER_EXPLOSION
            );
            EMITTER_EXPLOSION.on('frameEvent', consequenceExplosionVaisseau);

            vaisseau.vie--;
        }
        return;
    }

    if (obstacle.hasAttribute('data-degat')) {
        vaisseau.degat += 1 / vaisseau.vitesse;

        const EMITTER_DEGAT = new EventEmitter();
        animationSprite(
            vaisseau.element,
            SPRITE.DEGAT.X,
            SPRITE.DEGAT.Y,
            vaisseau.element.clientHeight,
            5,
            100,
            EMITTER_DEGAT
        );
        EMITTER_DEGAT.on('frameEvent', consequenceDegatVaisseau);

        JAUGE.style.clipPath = `polygon(0 0, ${vaisseau.degat}% 0, ${vaisseau.degat}% 100%, 0 100%)`;
    } 
}