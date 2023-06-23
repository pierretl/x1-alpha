var gravite = new Timer(function() {
    deplaceVaisseau(0, 1);
}, GRAVITE);

// desactive la gravité
gravite.stop();
