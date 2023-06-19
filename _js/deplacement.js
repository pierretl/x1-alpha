const 
    VAISSEAU = document.querySelector('.js--vaisseau'),
    REACTEUR = document.querySelector('.js--reacteur'),
    OBSTACLES = document.querySelectorAll('.js--obstacle'),
    DISTANCE = 30;


/// generate name for disctintion
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
    if (enCollision(VAISSEAU, LIMITE_BAS)) {
        character.element.style.top = LIMITE_BAS.offsetTop - VAISSEAU.clientHeight + 'px';
    } else if(enCollision(VAISSEAU, OBSTACLE)) {
        character.element.style.top = OBSTACLE.offsetTop - VAISSEAU.clientHeight + 'px';
    } else if(enCollision(VAISSEAU, OBSTACLE2)) {
        character.element.style.top = OBSTACLE2.offsetTop - VAISSEAU.clientHeight + 'px';
    } else {
        character.element.style.top = VAISSEAU.offsetTop + DISTANCE + 'px';
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


/// store key codes and currently pressed ones
var keys = {};
    keys.UP = 'ArrowUp';
    keys.RIGHT = 'ArrowRight';
    keys.DOWN = 'ArrowDown';
    keys.LEFT = 'ArrowLeft';

    
/// store reference to character's position and element
var character = {
    x: 300,
    y: 100,
    speedMultiplier: 10,
    element: VAISSEAU
};

/// key detection (better to use addEventListener, but this will do)
document.addEventListener('keydown', function(e) {
    detectionClavier(e);
    chuteVaisseau.stop();
});
document.addEventListener('keyup', function(e) {
    detectionClavier(e);
    VAISSEAU.style.transform = '';
    REACTEUR.style.transform = '';
    chuteVaisseau.start();
});

function detectionClavier(e) {
    e.preventDefault();
    let k = e.key;
    keys[k] = e.type == 'keydown';
}

function enCollisionOffset(a, b) {
    return (
      a.x < b.offsetLeft + b.offsetWidth &&
      a.x + a.element.offsetWidth > b.offsetLeft &&
      a.y < b.offsetTop + b.offsetHeight &&
      a.y + a.element.offsetHeight > b.offsetTop
    );
}
function enCollisionOffsetTest(a, b) {
    return (
      //a.x + a.element.offsetWidth > b.offsetLeft
      a.x + a.element.offsetWidth < b.offsetLeft
    );
}


function goto(dx, dy, direction ) {
    switch(direction){
        case 'horizontal':
            character.x += (dx||0);
            break;
        case 'vertical':
            character.y += (dy||0);
            break;
        case 'haut':
            if (dy === -1) {
                character.y += (dy||0);
            }
            break;
        case 'droite':
            if (dx === 1) {
                character.x += (dx||0);
            }
            break;
        case 'bas':
            if (dy === 1) {
                character.y += (dy||0);
            }
            break;
        case 'gauche':
            if (dx === -1) {
                character.x += (dx||0);
            }
            break;
    }
}


function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);  return arr;
  }


  function hitbox(character, dx, dy, obstacle) {

    let 
        collisionUniqueHaut = true,
        collisionUniqueBas = true,
        collisionUniqueGauche = true,
        collisionUniqueDroite = true;


    if( VAISSEAU.offsetTop + VAISSEAU.clientHeight - 1 === obstacle.offsetTop ) {
        obstacle.style.borderTopColor = 'cyan';
        goto(dx, dy, 'haut');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionOffset(character, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueHaut = false;
            }
        });  
        if (collisionUniqueHaut) {
            goto(dx, dy, 'horizontal');
        }
    }
     

    if ( VAISSEAU.offsetTop === obstacle.offsetTop + obstacle.clientHeight ) {
        obstacle.style.borderBottomColor = 'cyan';
        goto(dx, dy, 'bas');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionOffset(character, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueBas = false;
            }
        });  
        if (collisionUniqueBas) {
            goto(dx, dy, 'horizontal');
        }
    }


    if (VAISSEAU.offsetLeft === obstacle.offsetLeft + obstacle.clientWidth ) {
        obstacle.style.borderRightColor = 'cyan';
        goto(dx, dy, 'droite');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionOffset(character, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueDroite = false;
            }
        });  
        if (collisionUniqueDroite) {
            goto(dx, dy, 'vertical');
        }
    }


    if (VAISSEAU.offsetLeft + VAISSEAU.clientWidth - 1 === obstacle.offsetLeft ) {
        obstacle.style.borderLeftColor = 'cyan';
        goto(dx, dy, 'gauche');
        OBSTACLES.forEach(function(deuxiemeObstacle){
            if (enCollisionOffset(character, deuxiemeObstacle) && deuxiemeObstacle.id != obstacle.id) {
                collisionUniqueGauche = false;
            }
        });  
        if (collisionUniqueGauche) {
            goto(dx, dy, 'vertical');
        }
    }
    
}

/// character movement update
var moveCharacter = function(dx, dy){

    for (var i = 0; i < character.speedMultiplier; i++) {

        let deplacementLibre = true;

        OBSTACLES.forEach(function(obstacle){

            if (enCollisionOffset(character, obstacle)) {

                deplacementLibre = false;
                hitbox(character, dx, dy, obstacle);

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

        character.element.style.left = character.x + 'px';
        character.element.style.top = character.y + 'px';
        
    }
};



/// character control
var detectCharacterMovement = function(){

    let inclinaison= 15;
    REACTEUR.classList.remove(REACTEUR.dataset.boost);

    if ( keys[keys.UP] ) {
        moveCharacter(0, -1);
        REACTEUR.classList.add(REACTEUR.dataset.boost);
    }
    if ( keys[keys.RIGHT] ) {
        moveCharacter(1, 0);
        VAISSEAU.style.transform = `rotate(${inclinaison}deg)`;
        REACTEUR.style.transform = `rotate(${90 - inclinaison}deg)`;
    }
    if ( keys[keys.DOWN] ) {
        moveCharacter(0, 1);
        REACTEUR.style.transform = 'rotate(180deg)';
    }
    if ( keys[keys.LEFT] ) {
        moveCharacter(-1, 0);
        VAISSEAU.style.transform = `rotate(-${inclinaison}deg)`;
        REACTEUR.style.transform = `rotate(-${90 - inclinaison}deg)`;
    }

    if ( keys[keys.DOWN] && keys[keys.LEFT] ) {
        REACTEUR.style.transform = 'rotate(-135deg)';
    }
    if ( keys[keys.DOWN] && keys[keys.RIGHT] ) {
        REACTEUR.style.transform = 'rotate(135deg)';
    }
    if ( keys[keys.UP] && keys[keys.LEFT] ) {
        REACTEUR.style.transform = 'rotate(-45deg)';
    }
    if ( keys[keys.UP] && keys[keys.RIGHT] ) {
        REACTEUR.style.transform = 'rotate(45deg)';
    }
};

/// update current position on screen
moveCharacter();

/// game loop
setInterval(function(){
    detectCharacterMovement();
}, 1000/24);