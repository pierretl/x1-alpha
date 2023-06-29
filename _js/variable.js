const 
    SCENE = document.getElementById('scene'),
    DECOR = document.getElementById('sol');
    OBSTACLES = document.querySelectorAll('[data-obstacle]'),
    CONTENEUR = document.querySelector('[data-conteneur]'),
    DESTINATIONS = document.querySelectorAll('[data-destination]'),
    JAUGE = document.getElementById('jauge-degat'),
    GRAVITE = 100,
    SPRITE = {
        SRC: '_media/sprite.gif',
        EXPLOSION : {
            X: 106,
            Y: 0
        },
        DEGAT : {
            X: 0,
            Y: 0
        },
        CRATERE : {
            X: 202,
            Y: 224,
            W: 45,
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
        },
        ENTREPOT : {
            X: 202,
            Y: 432,
            W: 142,
            H: 124
        },
        PINCE : {
            X: 0,
            Y: 155,
            W: 83,
            H: 31
        }
    };

let 
    vaisseau = {
        x: 50,
        y: 100,
        element: document.getElementById('vaisseau'),
        reacteur: document.getElementById('reacteur'),
        vitesse: 15,
        inclinaison: 10,
        degat: 0,
        boom: document.getElementById('boom'),
        pince: document.getElementById('pince'),
        cargaisonHitbox: document.getElementById('hitbox-cargaison'),
        vie: 1
    },
    chargementPossible = false,
    toucheClavier;



/* Ajout d'id pour différencier les obstacles */
OBSTACLES.forEach(function(obstacle, index){
    obstacle.setAttribute("id", "obstacle-"+index);
});