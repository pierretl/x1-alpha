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

    //Haut
    if( vaisseau.element.offsetTop + vaisseau.element.clientHeight - 1 === obstacle.offsetTop ) {
        obstacle.style.borderTopColor = 'cyan';
        gravite.stop();
        goto(dx, dy, 'haut');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionVaisseau(vaisseau, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueHaut = false;
            }
        });  
        if (collisionUniqueHaut) {
            goto(dx, dy, 'horizontal');
        }
        infligeDegat(vaisseau, obstacle);
    }
     
    //Bas
    if ( vaisseau.element.offsetTop - 1 === obstacle.offsetTop + obstacle.clientHeight ) {
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
        infligeDegat(vaisseau, obstacle);
    }

    //Droite
    if (vaisseau.element.offsetLeft - 1 === obstacle.offsetLeft + obstacle.clientWidth ) {
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
        infligeDegat(vaisseau, obstacle);
    }

    //Gauche
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
        infligeDegat(vaisseau, obstacle);
    }
    
};