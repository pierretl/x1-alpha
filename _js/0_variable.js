const 
    OBSTACLES = document.querySelectorAll('[data-obstacle]'),
    JAUGE = document.getElementById('jauge-degat'),
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
    element: document.getElementById('vaisseau'),
    reacteur: document.getElementById('reacteur'),
    vitesse: 15,
    inclinaison: 10,
    degat: 0,
    boom: document.getElementById('boom'),
    vie: 1
};



/* Ajout d'id pour différencier les obstacles */
OBSTACLES.forEach(function(obstacle, index){
    obstacle.setAttribute("id", "obstacle-"+index);
});