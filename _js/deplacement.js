const OBSTACLES = document.querySelectorAll('.js--obstacle');

let vaisseau = {
    x: 300,
    y: 100,
    element: document.querySelector('.js--vaisseau'),
    reacteur: document.querySelector('.js--reacteur'),
    vitesse: 15,
    inclinaison: 10
};

let keys = {};
    keys.UP = 'ArrowUp';
    keys.RIGHT = 'ArrowRight';
    keys.DOWN = 'ArrowDown';
    keys.LEFT = 'ArrowLeft';


/* Ajout d'id pour différencier les obstacles */
OBSTACLES.forEach(function(obstacle, index){
    obstacle.setAttribute("id", "obstacle-"+index);
});


/**
 * Effectue une fonction tous les X ms
 * 
 * @param {function} fn La fonction a bouclé
 * @param {function} t Le lapse de temps
 */
function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function(newT = t) {
        t = newT;
        return this.stop().start();
    }
}


var chuteVaisseau = new Timer(function() {

    /*
    if (enCollision(vaisseau.element, LIMITE_BAS)) {
        vaisseau.element.style.top = LIMITE_BAS.offsetTop - vaisseau.element.clientHeight + 'px';
    } else if(enCollision(vaisseau.element, OBSTACLE)) {
        vaisseau.element.style.top = OBSTACLE.offsetTop - vaisseau.element.clientHeight + 'px';
    } else if(enCollision(vaisseau.element, OBSTACLE2)) {
        vaisseau.element.style.top = OBSTACLE2.offsetTop - vaisseau.element.clientHeight + 'px';
    } else {
        vaisseau.element.style.top = vaisseau.element.offsetTop + vaisseau.vitesse + 'px';
    }
*/

}, 20);
chuteVaisseau.stop();

document.querySelector('.js--pause').addEventListener('click', function(){
    chuteVaisseau.stop();
});
document.querySelector('.js--play').addEventListener('click', function(){
    chuteVaisseau.start();
});



/**
 * Detection de collision entre a et b
 * 
 * @param {HTMLElement} a 
 * @param {HTMLElement} b
 */
function enCollision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}



/**
 * Detection de collision entre le vaisseau et un obstacle
 * 
 * @param {object} vaisseau
 * @param {HTMLElement} obstacle
 */
function enCollisionVaisseau(vaisseau, obstacle) {
    return (
      vaisseau.x < obstacle.offsetLeft + obstacle.offsetWidth &&
      vaisseau.x + vaisseau.element.offsetWidth > obstacle.offsetLeft &&
      vaisseau.y < obstacle.offsetTop + obstacle.offsetHeight &&
      vaisseau.y + vaisseau.element.offsetHeight > obstacle.offsetTop
    );
}



/**
 * Ecouteur du clavier
 */
document.addEventListener('keydown', function(e) {
    detectionClavier(e);
    chuteVaisseau.stop();
});
document.addEventListener('keyup', function(e) {
    detectionClavier(e);
    vaisseau.element.style.transform = '';
    vaisseau.reacteur.style.transform = '';
    chuteVaisseau.start();
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
 * Zone de collision
 * 
 * @param {object} vaisseau
 * @param {number} dx
 * @param {number} dy
 * @param {HTMLElement} obstacle
 */
let hitbox = function(vaisseau, dx, dy, obstacle) {

    let 
        collisionUniqueHaut = true,
        collisionUniqueBas = true,
        collisionUniqueGauche = true,
        collisionUniqueDroite = true;


    if( vaisseau.element.offsetTop + vaisseau.element.clientHeight - 1 === obstacle.offsetTop ) {
        obstacle.style.borderTopColor = 'cyan';
        goto(dx, dy, 'haut');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionVaisseau(vaisseau, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueHaut = false;
            }
        });  
        if (collisionUniqueHaut) {
            goto(dx, dy, 'horizontal');
        }
    }
     

    if ( vaisseau.element.offsetTop === obstacle.offsetTop + obstacle.clientHeight ) {
        obstacle.style.borderBottomColor = 'cyan';
        goto(dx, dy, 'bas');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionVaisseau(vaisseau, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueBas = false;
            }
        });  
        if (collisionUniqueBas) {
            goto(dx, dy, 'horizontal');
        }
    }


    if (vaisseau.element.offsetLeft === obstacle.offsetLeft + obstacle.clientWidth ) {
        obstacle.style.borderRightColor = 'cyan';
        goto(dx, dy, 'droite');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionVaisseau(vaisseau, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueDroite = false;
            }
        });  
        if (collisionUniqueDroite) {
            goto(dx, dy, 'vertical');
        }
    }


    if (vaisseau.element.offsetLeft + vaisseau.element.clientWidth - 1 === obstacle.offsetLeft ) {
        obstacle.style.borderLeftColor = 'cyan';
        goto(dx, dy, 'gauche');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionVaisseau(vaisseau, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueGauche = false;
            }
        });  
        if (collisionUniqueGauche) {
            goto(dx, dy, 'vertical');
        }
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