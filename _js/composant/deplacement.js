let keys = {};
    keys.UP = 'ArrowUp';
    keys.RIGHT = 'ArrowRight';
    keys.DOWN = 'ArrowDown';
    keys.LEFT = 'ArrowLeft';



/**
 * Ecouteur du clavier
 */
document.addEventListener('keydown', function(e) {
    detectionClavier(e);
    gravite.stop();
});
document.addEventListener('keyup', function(e) {
    detectionClavier(e);
    vaisseau.element.style.transform = '';
    vaisseau.reacteur.style.transform = '';
    gravite.start();
});



/**
 * Detection des touches
 * 
 * @param {Event} e
 */
let detectionClavier = function(e) {
    e.preventDefault();
    let k = e.key;
    keys[k] = e.type == 'keydown';
    toucheClavier = k;
};



/**
 * Déplacement du vaisseau
 * 
 * @param {number} dx
 * @param {number} dy
 * @param {string} direction
 */
let goto = function(dx, dy, direction ) {
    switch(direction){
        case 'horizontal':
            vaisseau.x += (dx||0);
            break;
        case 'vertical':
            vaisseau.y += (dy||0);
            break;
        case 'haut':
            if (dy === -1) {
                vaisseau.y += (dy||0);
            }
            break;
        case 'droite':
            if (dx === 1) {
                vaisseau.x += (dx||0);
            }
            break;
        case 'bas':
            if (dy === 1) {
                vaisseau.y += (dy||0);
            }
            break;
        case 'gauche':
            if (dx === -1) {
                vaisseau.x += (dx||0);
            }
            break;
    }
};



/**
 * Mise à jour du déplacement du vaisseau
 * 
 * @param {number} dx
 * @param {number} dy
 */
let deplaceVaisseau = function(dx, dy){

    for (var i = 0; i < vaisseau.vitesse; i++) {

        let deplacementLibre = true;

        OBSTACLES.forEach(function(obstacle){

            if (enCollisionVaisseau(vaisseau, obstacle)) {

                deplacementLibre = false;
                hitbox(vaisseau, dx, dy, obstacle);

            } else {
                obstacle.style.borderTopColor = null;
                obstacle.style.borderRightColor = null;
                obstacle.style.borderBottomColor = null;
                obstacle.style.borderLeftColor = null;
            }
            
        })

        
        if (enCollision(vaisseau.pinceHitbox, CONTENEUR) && toucheClavier === ' ') {
            new animationSpriteChargement (
                SPRITE.PINCE.Y,
                SPRITE.PINCE.X,
                SPRITE.PINCE.H,
                vaisseau.pince,
                14,
                50
            );
        }

        if (deplacementLibre){
            goto(dx, dy, 'horizontal');
            goto(dx, dy, 'vertical');
        }

        vaisseau.element.style.left = vaisseau.x + 'px';
        vaisseau.element.style.top = vaisseau.y + 'px';
        
    }
};



/**
 * Control du vaisseau
 */
var controlVaisseau = function(){

    vaisseau.reacteur.classList.remove(vaisseau.reacteur.dataset.boost);

    if ( keys[keys.UP] ) {
        deplaceVaisseau(0, -1);
        vaisseau.reacteur.classList.add(vaisseau.reacteur.dataset.boost);
    }
    if ( keys[keys.RIGHT] ) {
        deplaceVaisseau(1, 0);
        vaisseau.element.style.transform = `rotate(${vaisseau.inclinaison}deg)`;
        vaisseau.reacteur.style.transform = `rotate(${90 - vaisseau.inclinaison}deg)`;
    }
    if ( keys[keys.DOWN] ) {
        deplaceVaisseau(0, 1);
        vaisseau.reacteur.style.transform = 'rotate(180deg)';
    }
    if ( keys[keys.LEFT] ) {
        deplaceVaisseau(-1, 0);
        vaisseau.element.style.transform = `rotate(-${vaisseau.inclinaison}deg)`;
        vaisseau.reacteur.style.transform = `rotate(-${90 - vaisseau.inclinaison}deg)`;
    }

    if ( keys[keys.DOWN] && keys[keys.LEFT] ) {
        vaisseau.reacteur.style.transform = 'rotate(-135deg)';
    }
    if ( keys[keys.DOWN] && keys[keys.RIGHT] ) {
        vaisseau.reacteur.style.transform = 'rotate(135deg)';
    }
    if ( keys[keys.UP] && keys[keys.LEFT] ) {
        vaisseau.reacteur.style.transform = 'rotate(-45deg)';
    }
    if ( keys[keys.UP] && keys[keys.RIGHT] ) {
        vaisseau.reacteur.style.transform = 'rotate(45deg)';
    }
};



/**
 * Met ajour la position du vaisseau sur la scène
 */
deplaceVaisseau();



/**
 * Boucle du jeu
 */
setInterval(function(){
    controlVaisseau();
}, 1000/24);