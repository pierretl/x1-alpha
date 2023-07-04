/**
 * Joue une animation du sprite 
 * 
 * @param {HTMLElement} element
 * @param {number} spriteX
 * @param {number} spriteY
 * @param {number} spriteH
 * @param {number} totalFrame
 * @param {number} duree
 * @param {object} eventEmitter
 * @param {boolean} rewindAnime invers le sens de lecture de l'animation
 */
const animationSprite = function(element, spriteX, spriteY, spriteH, totalFrame, duree, eventEmitter=false, rewindAnime=false) {

    let positionY = rewindAnime ? spriteH * totalFrame : 0;
    let currentFrame = rewindAnime ? totalFrame + 1 : 1;

    function moveSprite(){   

        setTimeout(function(){
  
            element.style.backgroundPosition = `-${spriteX}px -${spriteY + positionY}px`;
            
            if (eventEmitter) {
                eventEmitter.emit('frameEvent', currentFrame);
            }
    
            if (rewindAnime) {
                positionY -= spriteH;
                currentFrame = --currentFrame;

                if (currentFrame > 0) {
                    gravite.stop(); 
                    requestAnimationFrame(moveSprite);
                } else {
                    //permet de relancer la gravitation sans etre dans un boucle infini
                    document.dispatchEvent(new KeyboardEvent('keyup', {
                        'key': 'ArrowDown'
                    }));
                }
            } else {
                positionY += spriteH;
                currentFrame = ++currentFrame;

                if (currentFrame <= totalFrame) {
                    gravite.stop(); 
                    requestAnimationFrame(moveSprite);
                } else {
                    //permet de relancer la gravitation sans etre dans un boucle infini
                    document.dispatchEvent(new KeyboardEvent('keyup', {
                        'key': 'ArrowDown'
                    }));
                }

            }

    
        }, duree / totalFrame);
    }

    requestAnimationFrame(moveSprite);

}



const consequenceExplosionVaisseau = (frame) => {
    if (frame == 4) {
        vaisseau.element.style.backgroundImage = 'none';
        vaisseau.reacteur.style.backgroundImage = 'none';
        vaisseau.pince.style.backgroundImage = 'none';
    }
};



const consequenceVaisseauCharge = (frame) => {
    if (frame == 7) {
        CONTENEUR.style.display = 'none';
    }
    vaisseau.cargaison = true;
};



const consequenceVaisseauDecharge = (frame) => {
    if (frame == 7) {
        document.querySelector('[data-destination] .conteneur').classList.remove('hide');
        document.querySelector('[data-destination]').classList.remove('--actif');
    }
    vaisseau.cargaison = false;
};



const consequenceDegatVaisseau = (frame) => {
    if (frame == 5) {
        vaisseau.element.style.removeProperty('background-position');
    }
};