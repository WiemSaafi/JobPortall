const express = require('express');
const router = express.Router();
const { createHeure, heuredepartjourmois, heureDépart } = require('../controllers/horaireController');

router.post('/heurs', isAuthenticated, createHeuser);
router.get('/heure/:id', isAuthenticated, singleHeure);
router.get('/jourmois', isAuthenticated,heuredepartjourmois );
heureDépart
router.get('/dept', isAuthenticated,heureDépart);