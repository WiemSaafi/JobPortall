const express = require('express');
const router = express.Router();
const { createHeure, heuredepartjourmois, heureDépart, singleHeure } = require('../controllers/horaireController');
const { isAuthenticated } = require('../middleware/auth');
router.post('/heurs', isAuthenticated, createHeure);
router.get('/heure/:id', isAuthenticated, singleHeure);
router.get('/jourmois', isAuthenticated,heuredepartjourmois );
router.get('/dept', isAuthenticated,heureDépart);

module.exports = router