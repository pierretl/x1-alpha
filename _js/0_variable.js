const 
    OBSTACLES = document.querySelectorAll('[data-obstacle]'),
    JAUGE = document.getElementById('jauge-degat'),
    PLANETE = document.getElementById('planete'),
    GRAVITE = 50,
    SPRITE = {
        EXPLOSION : {
            X: 106,
            Y: 0
        },
        CRATERE : {
            X: 202,
            Y: 224,
            W: 69,
            H: 17
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