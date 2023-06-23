/**
 * Initilise la taille du canvas
 */
DECOR.setAttribute('width', SCENE.clientWidth);
DECOR.setAttribute('height', '90');



/**
 * Dessine le sol de la planete
 */
let sol = function() {
    const ctx = DECOR.getContext('2d');
    const img = new Image();

    img.onload = () => {
        for (let i = 0; i < Math.ceil(SCENE.clientWidth / SPRITE.SOL.W); i++) {
            ctx.drawImage(
                img, // image
                SPRITE.SOL.X, // source x
                SPRITE.SOL.Y, // source y
                SPRITE.SOL.W, // source width
                SPRITE.SOL.H, // source height
                i * SPRITE.SOL.W,  // target x
                0, // target y
                SPRITE.SOL.W, // target width
                SPRITE.SOL.H // target height
            );
        }
    };
    img.src = SPRITE.SRC;
}



/**
 * Ajoute des cratères
 */
let crateres = function() {
    const 
        ctx = DECOR.getContext('2d'),
        img = new Image(),
        nbCratere = 6,
        marge = 10;

    // créer un tableau des positions Y des images
    let imageCratereY = [];
    for (let i = 0; i < nbCratere; i++) {
        imageCratereY[i] = `${SPRITE.CRATERE.Y + i * SPRITE.CRATERE.H}`;
    }

    img.onload = () => {
        for (let i = 0; i < nbCratere; i++) {
            // tirage aléatoire
            let tirage = chiffreAleatoire(imageCratereY.length, 1);

            // récupére le contenu du tableau tié au sort
            let valeurY = imageCratereY[tirage - 1];

            ctx.drawImage(
                img, // image
                SPRITE.CRATERE.X, // source x
                valeurY, // source y
                SPRITE.CRATERE.W, // source width
                SPRITE.CRATERE.H, // source height
                i * Math.ceil(SCENE.clientWidth / nbCratere),  // target x
                chiffreAleatoire(DECOR.clientHeight - SPRITE.CRATERE.H, marge), // target y
                SPRITE.CRATERE.W, // target width
                SPRITE.CRATERE.H // target height
            );

            // supprime du tableau la valeur tiré au sort
            supprimeValeurDunTableau(valeurY, imageCratereY);
        }
    };
    img.src = SPRITE.SRC;
}



/**
 * Dessine le decor
 */
sol();
crateres();