/**
 * Ajoute des degats au vaisseau si obstacle est affectant et retire une vie 
 * 
 * @param {object} vaisseau
 * @param {HTMLElement} obstacle
 */
let infligeDegat = function(vaisseau, obstacle) {

    if (Math.round(vaisseau.degat) >= 100) {
        if (vaisseau.vie > 0) {
            new animationSpriteExplosion (
                SPRITE.EXPLOSION.Y,
                SPRITE.EXPLOSION.X,
                vaisseau.boom.clientHeight,
                vaisseau.boom,
                9,
                100
            );
            vaisseau.vie--;
        }
        return;
    }

    if (obstacle.hasAttribute('data-degat')) {
        vaisseau.degat += 1 / vaisseau.vitesse;
        new animationSprite (
            SPRITE.DEGAT.Y,
            SPRITE.DEGAT.X,
            vaisseau.element.clientHeight,
            vaisseau.element,
            4,
            100
        );
        JAUGE.style.clipPath = `polygon(0 0, ${vaisseau.degat}% 0, ${vaisseau.degat}% 100%, 0 100%)`;
    } 
}