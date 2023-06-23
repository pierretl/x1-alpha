const 
    SCENE = document.getElementById('scene'),
    DECOR = document.getElementById('sol');
    OBSTACLES = document.querySelectorAll('[data-obstacle]'),
    JAUGE = document.getElementById('jauge-degat'),
    GRAVITE = 50,
    SPRITE = {
        SRC: '_media/sprite.gif',
        EXPLOSION : {
            X: 106,
            Y: 0
        },
        CRATERE : {
            X: 202,
            Y: 224,
            W: 69,
            H: 17
        },
        SOL : {
            X: 202,
            Y: 326,
            W: 45,
            H: 90
        },
        ETOILE : {
            X: 202,
            Y: 0,
            W: 45,
            H: 45
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