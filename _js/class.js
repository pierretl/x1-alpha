/**
 * Joue une animation du sprite 
 * 
 * @param {number} spriteY
 * @param {number} spriteX
 * @param {number} spriteH
 * @param {HTMLElement} element
 * @param {number} nombreEtape
 * @param {number} delai
 */
const animationSprite = class {

    constructor(spriteY, spriteX, spriteH, element, nombreEtape, delai) {
        this.spriteY = spriteY;
        this.spriteX = spriteX;
        this.spriteH = spriteH;
        this.element = element;
        this.nombreEtape = nombreEtape;
        this.delai = delai;

        this.currentFrame = 0;
        this.animation = setInterval(
            this.start.bind(this),
            this.delai
        )
    }

    start() {
        
        if (this.nombreEtape <= this.currentFrame) {
            this.stop();
            this.element.style.backgroundPosition = `-${this.spriteX}px -${this.spriteY}px`;
            return;
        }

        this.element.style.backgroundPosition = `-${this.spriteX}px -${this.spriteY + this.spriteH * this.currentFrame}px`;
        this.onFrame();
        this.currentFrame = ++this.currentFrame;
    }

    stop() {
        clearInterval(this.animation);
    }

    onFrame() {}
};



const animationSpriteExplosion = class extends animationSprite {

    onFrame() {
        if (this.currentFrame == 4) {
            vaisseau.element.style.backgroundImage = 'none';
            vaisseau.reacteur.style.backgroundImage = 'none';
        }
    }

}



const animationSpriteChargement = class extends animationSprite {

    onFrame() {
        if (this.currentFrame == 7) {
            CONTENEUR.style.display = 'none';
        }
        if (this.currentFrame == 13) {
            this.stop();
            return;
        }
    }

}
  