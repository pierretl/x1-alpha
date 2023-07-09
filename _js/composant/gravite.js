var gravite = new Timer(function() {
    if (partie.statut != 'pause') {
        deplaceVaisseau(0, 1);
    }
}, DELAI_GRAVITE);

// desactive la gravité
// gravite.stop();