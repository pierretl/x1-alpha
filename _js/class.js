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

        this.currentEtape = 0;
        this.animation = setInterval(
            this.start.bind(this),
            this.delai
        )
    }

    start() {
        
        if (this.nombreEtape <= this.currentEtape) {
            this.stop();
            this.element.style.backgroundPosition = `-${this.spriteX}px -${this.spriteY}px`;
            return;
        }

        this.element.style.backgroundPosition = `-${this.spriteX}px -${this.spriteY + this.spriteH * this.currentEtape}px`;
        this.verif();
        this.currentEtape = ++this.currentEtape;
    }

    stop() {
        clearInterval(this.animation);
    }

    verif() {}
};



const animationSpriteExplosion = class extends animationSprite {

    verif() {
        if (this.currentEtape == 4) {
            vaisseau.element.style.backgroundImage = 'none';
            vaisseau.reacteur.style.backgroundImage = 'none';
        }
    }

}
  