const 
    SCENE = document.getElementById('scene'),
    DECOR = document.getElementById('decor');
    OBSTACLES = document.querySelectorAll('[data-obstacle]'),
    CONTENEUR = document.querySelector('[data-conteneur]'),
    DESTINATIONS = document.querySelectorAll('[data-destination]'),
    JAUGE = document.getElementById('jauge-degat'),
    CARGAISON = document.getElementById('cargaison'),
    DIALOG_START = document.getElementById('dialogStart'),
    DIALOG_SATUT = document.getElementById('dialogStatut'),
    DIALOG_SECTION_PAUSE = document.getElementById('pauseSection'),
    DIALOG_SECTION_WIN = document.getElementById('winSection'),
    DIALOG_SECTION_LOOSE = document.getElementById('looseSection'),
    FORM_PARTIE = document.getElementById('formPartie'),
    BTN_RELANCER = document.getElementById('btnRelancer'),
    BTN_REJOUER = document.getElementById('btnRejouer'),
    BTN_JOUER = document.getElementById('btnJouer'),
    DELAI_GRAVITE = 100,
    CSS_DESTINATION_ACTIF = '--actif',
    CSS_DESTINATION_READY = '--ready',
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
        },
        CONTENEUR : {
            X: 202,
            Y: 556,
            W: 29,
            H: 18
        }
    };

let 
    vaisseau = {
        x: 50,
        y: 100,
        element: document.getElementById('vaisseau'),
        reacteur: document.getElementById('reacteur'),
        vitesseMax: 15,
        inclinaison: 10,
        degat: 0,
        boom: document.getElementById('boom'),
        pince: document.getElementById('pince'),
        cargaisonHitbox: document.getElementById('hitbox-cargaison'),
        vie: 1,
        cargaison: false
    },
    toucheClavier,
    acceleration = 0,
    partie = {
        statut: 'pause',
        nombreConteneur: 3
    };
