/**
 * Effectue une fonction tous les X ms
 * 
 * @param {function} fn La fonction a bouclé
 * @param {function} t Le lapse de temps
 */
let Timer = function (fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function(newT = t) {
        t = newT;
        return this.stop().start();
    }
}



/**
 * Obtient un chiffre aléatoire dans une intervalle
 * 
 * @param {number} min
 * @param {number} max
 */
let chiffreAleatoire = function(max, min=0) {
    return Math.round(Math.random() * (max - min) + min);
}



/**
 * Supprime la valeur d'un tableau
 * 
 * @param {string} value
 * @param {array} array
 */
let supprimeValeurDunTableau = function(value, array) {
    let index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
}