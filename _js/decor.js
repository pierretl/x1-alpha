const NBCRATERE = 6;

// créer un tableau des positions Y des images
let imageCratereY = [];
for (let i = 0; i < NBCRATERE; i++) {
    imageCratereY[i] = `${SPRITE.CRATERE.Y + i * SPRITE.CRATERE.H}`;
}


// Ajoute les images sur la planète
for (let i = 0; i < NBCRATERE; i++) {

    const POSITION = ['start', 'center', 'end'];

    // initialisation des cratères
    let cratere = document.createElement('div');
    cratere.classList.add('cratere');
    cratere.style.width = `${SPRITE.CRATERE.W}px`;
    cratere.style.height = `${SPRITE.CRATERE.H}px`;
    cratere.style.alignSelf = POSITION[chiffreAleatoire(POSITION.length - 1)];
    cratere.style.justifySelf = POSITION[chiffreAleatoire(POSITION.length - 1)];

    // tirage aléatoire
    let tirage = chiffreAleatoire(imageCratereY.length);

    // récupére le contenu du tableau tié au sort
    let valeurY = imageCratereY[tirage - 1];
    cratere.style.backgroundPosition = `-${SPRITE.CRATERE.X}px -${imageCratereY[tirage - 1]}px`;

    // supprime du tableau la valeur tiré au sort
    supprimeValeurDunTableau(valeurY, imageCratereY);

    //ajoute le cratère sur la planete
    PLANETE.insertAdjacentElement("afterbegin", cratere);
    //cratere.insertAdjacentText("afterbegin", valeurY); // debug
    
}