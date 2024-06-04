const express = require('express');
const router = express.Router();
const { createHeure, heuredepartjourmois, heureDépart, singleHeure, getDerniereEntreeSortie, calculerPourcentagePresence } = require('../controllers/horaireController');
const { isAuthenticated } = require('../middleware/auth');

//router.post('/heurs', isAuthenticated, createHeure);
router.get('/heure/:id',singleHeure);
router.get('/jourmois', isAuthenticated,heuredepartjourmois );
router.get('/dept', heureDépart);
router.get('/dernierentreesortie/:_id', getDerniereEntreeSortie);
router.get('/pourcentagepresence',calculerPourcentagePresence);
module.exports = router