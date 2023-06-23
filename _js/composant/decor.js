/**
 * Initilise la taille du canvas
 */
DECOR.setAttribute('width', SCENE.clientWidth);
DECOR.setAttribute('height', SCENE.clientHeight);



let dessineLeDecor = function() {
    const 
        CTX = DECOR.getContext('2d'),
        IMG_SOL = new Image(),
        IMG_CRATERE = new Image(),
        SOL_TARGET_Y = SCENE.clientHeight - SPRITE.SOL.H,
        CRATERE_NOMBRE = 6,
        CRATERE_MARGE = 10;


    /**
     * Dessine le ciel
     */
    CTX.fillRect(0, 0, SCENE.clientWidth, SCENE.clientHeight);



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

}



dessineLeDecor();