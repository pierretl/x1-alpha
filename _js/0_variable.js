const 
    OBSTACLES = document.querySelectorAll('.js--obstacle'),
    GRAVITE = 50;

let vaisseau = {
    x: 100,
    y: 100,
    element: document.querySelector('.js--vaisseau'),
    reacteur: document.querySelector('.js--reacteur'),
    vitesse: 15,
    inclinaison: 10,
    degat: 0,
    boom: document.querySelector('.js--boom')
};



/* Ajout d'id pour différencier les obstacles */
OBSTACLES.forEach(function(obstacle, index){
    obstacle.setAttribute("id", "obstacle-"+index);
});