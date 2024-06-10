const express = require('express');
const router = express.Router();
const { createHeure, heuredepartjourmois, heureDépart, singleHeure, getDerniereEntreeSortie, calculerPourcentagePresence, calculerTempsDeTravail, heureDépartByData, heureDépartByDate } = require('../controllers/horaireController');
const { isAuthenticated } = require('../middleware/auth');

//router.post('/heurs', isAuthenticated, createHeure);
router.get('/heure/:id',singleHeure);
router.get('/jourmois/:_id', isAuthenticated,heuredepartjourmois );
router.get('/dept', heureDépart);
router.get('/deptByDate', heureDépartByDate);
router.get('/dernierentreesortie/:_id', getDerniereEntreeSortie);
router.get('/pourcentagepresence',calculerPourcentagePresence);
router.get('/calculerTempsDeTravail',calculerTempsDeTravail );
module.exports = router