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
 * @param {HTMLElement} elementInteraction
 */
const animationSprite = function(element, spriteX, spriteY, spriteH, totalFrame, duree, eventEmitter=false, rewindAnime=false, elementInteraction=false) {

    let positionY = rewindAnime ? spriteH * totalFrame : 0;
    let currentFrame = rewindAnime ? totalFrame + 1 : 1;

    function moveSprite(){   

        setTimeout(function(){
  
            element.style.backgroundPosition = `-${spriteX}px -${spriteY + positionY}px`;
            
            if (eventEmitter) {
                eventEmitter.emit('frameEvent', {currentFrame:currentFrame,elementInteraction:elementInteraction});
            }
    
            if (rewindAnime) {
                positionY -= spriteH;
                currentFrame = --currentFrame;

                if (currentFrame > 0) {
                    gravite.stop(); 
                    requestAnimationFrame(moveSprite);
                    return
                } 
                if (partie.nombreConteneur != 0) {
                    //permet de relancer la gravitation sans etre dans un eboucle infini
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
                    return;
                } 
                if (partie.nombreConteneur != 0) {
                    //permet de relancer la gravitation sans etre dans une boucle infini
                    document.dispatchEvent(new KeyboardEvent('keyup', {
                        'key': 'ArrowDown'
                    }));
                }

            }

    
        }, duree / totalFrame);
    }

    requestAnimationFrame(moveSprite);

}



const consequenceExplosionVaisseau = (data) => {
    if (data['currentFrame'] == 4) {
        vaisseau.element.style.backgroundImage = 'none';
        vaisseau.reacteur.style.backgroundImage = 'none';
        vaisseau.pince.style.backgroundImage = 'none';
    }
};



const consequenceVaisseauCharge = (data) => {
    if (data['currentFrame'] == 7) {
        CONTENEUR.querySelector('.conteneur').style.display = 'none';
    }
    if (
        data['currentFrame'] == 14 && 
        partie.nombreConteneur > 1 //
    ) {
        console.log('animation a faire et à déclencher');
        setTimeout(() => {
            CONTENEUR.querySelector('.conteneur').removeAttribute('style');
          }, "1500")

    } 
    vaisseau.cargaison = true;
};



const consequenceVaisseauDecharge = (data) => {
    if (data['currentFrame'] == 7) {
        data['elementInteraction'].querySelector('.conteneur').classList.remove('hide');
        data['elementInteraction'].classList.remove('--actif');
    }
    if (data['currentFrame'] == 14) {
        partie.nombreConteneur -= 1;
        if (partie.nombreConteneur === 0) {
            console.log('gagné');
        }
    }
    vaisseau.cargaison = false;
};



const consequenceDegatVaisseau = (data) => {
    if (data['currentFrame'] == 5) {
        vaisseau.element.style.removeProperty('background-position');
    }
};