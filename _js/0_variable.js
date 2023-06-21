const 
    OBSTACLES = document.querySelectorAll('.js--obstacle'),
    JAUGE = document.querySelector('.js--jauge-degat'),
    GRAVITE = 50,
    SPRITE = {
        EXPLOSION : {
            X: 106,
            Y: 0
        }
    };

let vaisseau = {
    x: 50,
    y: 100,
    element: document.querySelector('.js--vaisseau'),
    reacteur: document.querySelector('.js--reacteur'),
    vitesse: 15,
    inclinaison: 10,
    degat: 0,
    boom: document.querySelector('.js--boom'),
    vie: 1
};



/* Ajout d'id pour différencier les obstacles */
OBSTACLES.forEach(function(obstacle, index){
    obstacle.setAttribute("id", "obstacle-"+index);
});