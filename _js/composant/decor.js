/**
 * Initilise la taille du canvas
 */
DECOR.setAttribute('width', SCENE.clientWidth);
DECOR.setAttribute('height', SCENE.clientHeight);



/**
 * Ajoute des étoiles  
 * 
 * @param {object} CTX HTMLElement.getContext('2d')
 * @param {object} new Image()
 * @param {number} spriteY
 */
let ajouteEtoile = function(ctx, img, spriteY) {
    const
        ETOILE_MAX_W = Math.ceil(SCENE.clientWidth / SPRITE.ETOILE.W),
        ETOILE_MAX_H = Math.ceil(SCENE.clientHeight / SPRITE.ETOILE.H);

    img.onload = () => {
        for (let i = 0; i < ETOILE_MAX_W; i++) {
            for (let j = 0; j < ETOILE_MAX_H; j++) {
                if (chiffreAleatoire(30, 0) == 1) {
                    ctx.drawImage(
                        img, // image
                        SPRITE.ETOILE.X, // source x
                        spriteY, // source y
                        SPRITE.ETOILE.W, // source width
                        SPRITE.ETOILE.H, // source height
                        i * SPRITE.ETOILE.W,  // target x
                        j * SPRITE.ETOILE.H , // target y
                        SPRITE.ETOILE.W, // target width
                        SPRITE.ETOILE.H // target height
                    );
                }
            }
        }
    };
    img.src = SPRITE.SRC;
}



/**
 * Génère le décor 
 */
let dessineLeDecor = function() {
    const 
        CTX = DECOR.getContext('2d'),
        IMG_ETOILE1 = new Image(),
        IMG_ETOILE2 = new Image(),
        IMG_ETOILE3 = new Image(),
        IMG_ETOILE4 = new Image(),
        IMG_ETOILE5 = new Image(),
        IMG_SOL = new Image(),
        IMG_CRATERE = new Image(),
        IMG_ENTREPOT = new Image(),
        SOL_TARGET_Y = SCENE.clientHeight - SPRITE.SOL.H,
        CRATERE_NOMBRE = 6,
        CRATERE_MARGE = 10;



    /**
     * Dessine le ciel
     */
    CTX.fillRect(0, 0, SCENE.clientWidth, SCENE.clientHeight);



    /**
     * Ajoute des étoiles
     */
    ajouteEtoile(CTX, IMG_ETOILE1, SPRITE.ETOILE.Y);
    ajouteEtoile(CTX, IMG_ETOILE2, SPRITE.ETOILE.Y+SPRITE.ETOILE.H);
    ajouteEtoile(CTX, IMG_ETOILE3, SPRITE.ETOILE.Y+2*SPRITE.ETOILE.H);
    ajouteEtoile(CTX, IMG_ETOILE4, SPRITE.ETOILE.Y+3*SPRITE.ETOILE.H);
    ajouteEtoile(CTX, IMG_ETOILE5, SPRITE.ETOILE.Y+4*SPRITE.ETOILE.H);



    /**
     * Dessine le sol de la planete
     */
    IMG_SOL.onload = () => {
        for (let i = 0; i < Math.ceil(SCENE.clientWidth / SPRITE.SOL.W); i++) {
            CTX.drawImage(
                IMG_SOL, // image
                SPRITE.SOL.X, // source x
                SPRITE.SOL.Y, // source y
                SPRITE.SOL.W, // source width
                SPRITE.SOL.H, // source height
                i * SPRITE.SOL.W,  // target x
                SOL_TARGET_Y, // target y
                SPRITE.SOL.W, // target width
                SPRITE.SOL.H // target height
            );
        }
    };
    IMG_SOL.src = SPRITE.SRC;

    
    /**
     * Ajoute des cratères
     */
    
    // créer un tableau des positions Y des images
    let imageCratereY = [];
    for (let i = 0; i < CRATERE_NOMBRE; i++) {
        imageCratereY[i] = `${SPRITE.CRATERE.Y + i * SPRITE.CRATERE.H}`;
    }

    IMG_CRATERE.onload = () => {
        for (let i = 0; i < CRATERE_NOMBRE; i++) {
            // tirage aléatoire
            let tirage = chiffreAleatoire(imageCratereY.length, 1);

            // récupére le contenu du tableau tié au sort
            let valeurY = imageCratereY[tirage - 1];

            CTX.drawImage(
                IMG_CRATERE, // image
                SPRITE.CRATERE.X, // source x
                valeurY, // source y
                SPRITE.CRATERE.W, // source width
                SPRITE.CRATERE.H, // source height
                i * Math.ceil(SCENE.clientWidth / CRATERE_NOMBRE),  // target x
                SOL_TARGET_Y + chiffreAleatoire(SPRITE.SOL.H - SPRITE.CRATERE.H, CRATERE_MARGE), // target y
                SPRITE.CRATERE.W, // target width
                SPRITE.CRATERE.H // target height
            );

            // supprime du tableau la valeur tiré au sort
            supprimeValeurDunTableau(valeurY, imageCratereY);
        }
    };   
    IMG_CRATERE.src = SPRITE.SRC;



    /**
     * Ajout de l'entrepot
     */
    IMG_ENTREPOT.onload = () => {
        CTX.drawImage(
            IMG_ENTREPOT, // image
            SPRITE.ENTREPOT.X, // source x
            SPRITE.ENTREPOT.Y, // source y
            SPRITE.ENTREPOT.W, // source width
            SPRITE.ENTREPOT.H, // source height
            40,  // target x
            SCENE.clientHeight - ( SPRITE.ENTREPOT.H + 20), // target y
            SPRITE.ENTREPOT.W, // target width
            SPRITE.ENTREPOT.H // target height
        );
    };
    IMG_ENTREPOT.src = SPRITE.SRC;

}



dessineLeDecor();