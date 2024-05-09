const HeureDépart = require('../models/horaireDépartModel');
const ErrorResponse = require('../utils/errorResponse');

exports.createHeure = async (req, res, next) => {
    try {
        const heureStr = req.body.heure;
        const typeHeureStr = req.body.typeHeure;
        
        if (typeHeureStr === "entrée") {
            const currentDate = new Date();
            const heureDépartDate = new Date(currentDate.toDateString() + ' ' + heureStr);

            if (isNaN(heureDépartDate.getTime())) {
                return res.status(400).json({ success: false, error: "Format de date invalide pour heureDépart" });
            }
    
            const heureDepart = await HeureDepart.create({
                Heure:  heureDépartDate,
                typeHeure: "entrée",
                user: req.user.id
            });
    
            // Émettre les données de l'heure de départ via WebSocket
            emitNewDepartureTime(heureDepart);
    
            return res.status(201).json({
                success: true,
                heureDepart
            });
        
        } else if (typeHeureStr === "sortie") {
            const currentDate = new Date();
            const heureSortieDate = new Date(currentDate.toDateString() + ' ' + heureStr);
    
            if (isNaN(heureSortieDate.getTime())) {
                return res.status(400).json({ success: false, error: "Format de date invalide pour heureSortie" });
            }
    
            const heureSortie = await HeureDepart.create({
                Heure: heureSortieDate,
                typeHeure: "sortie",
                user: req.user.id
            });
    
            return res.status(201).json({
                success: true,
                heureSortie
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.heuredepartjourmois = async (req, res, next) => {
    const selectedDay = req.query.day;
    const selectedMonth = req.query.month; // Supposons que le mois soit passé sous forme de numéro (1 pour janvier, 2 pour février, etc.)
    const selectedYear = req.query.year;
    // Vérifier si le jour de la semaine sélectionné est valide
    const validDays = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi','samedi'];
    const validMonths = ['janvier', 'février', 'mars', 'avril', 'mai','juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const validYears = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i)// Liste des 21 années précédentes et suivantes
    // Vérifier si le jour sélectionné est valide
    if (!validDays.includes(selectedDay.toLowerCase())) {
        return res.status(400).json({ success: false, error: "Mois invalide" });
    }
    if (!validMonths.includes(selectedMonth.toLowerCase())) {
        return res.status(400).json({ success: false, error: "Mois invalide" });
    }
    if (!validYears.includes(parseInt(selectedYear))) {
        return res.status(400).json({ success: false, error: "Année invalide" });
    }
  
    try {
        // Récupérer toutes les heures de départ de la base de données
        const allHeuresDépart = await HeureDépart.find(req.body); // Vous pouvez ajouter des conditions de recherche si nécessaire
        
        // Filtrer les heures de départ pour le jour, le mois et l'année spécifiés
        const heuresDépartJourMois = allHeuresDépart.filter(heure => {
            if (heure.Heure) { // Vérifier si Heure est défini
                const heureJour = heure.Heure.getDay(); // Récupérer le jour de la semaine de l'heure de départ
                const heureMois = heure.Heure.getMonth(); // Récupérer le mois de l'heure de départ
                const heureAnnee = heure.Heure.getFullYear();
                console.log('heureAnnee:', heureAnnee); // Récupérer l'année de l'heure de départ
                const jourIndex = validDays.indexOf(selectedDay.toLowerCase()); // Index du jour sélectionné
                const moisIndex = validMonths.indexOf(selectedMonth.toLowerCase()); // Index du mois sélectionné
                return heureJour === jourIndex && heureMois === moisIndex && heureAnnee === parseInt(selectedYear);
            }
        });

        res.status(200).json(heuresDépartJourMois);
        console.log('heuresDépartJourMois', heuresDépartJourMois);
    } catch (error) {
        next(error);
    }
};
exports.singleHeure = async (req, res, next) => {
    try {
        const heure = await HeureDépart.findById(req.params.id);
        res.status(200).json({
            success: true,
          heure
        })
    } catch (error) {
        next(error);
    }
}
exports.getDerniereEntreeSortie = async (req, res, next) => {
    try {
        // Recherche de la dernière entrée de l'utilisateur
        const derniereEntree = await HeureDépart.findOne({ user: req.params._id, typeHeure: 'entrée' })
            .sort({ "Heure": -1 }) // Trie par ordre décroissant de la date/heure
            .limit(1);

        // Recherche de la dernière sortie de l'utilisateur
        const derniereSortie = await HeureDépart.findOne({ user: req.params._id, typeHeure: 'sortie' })
            .sort({ "Heure": -1 }) // Trie par ordre décroissant de la date/heure
            .limit(1);

        res.status(200).json({
            success: true,
            derniereEntree,
            derniereSortie
        });
    } catch (error) {
        next(error);
    }
};

exports.heureDépart = async (req, res) => {
    try {
        const heures = await HeureDépart.find(req.body);
        console.log("Toutes les heures de départ :", heures);
        if (!heures) {
            return res.status(404).json({ success: false, error: "Heures de départ non trouvées" });
        }
        res.status(200).json({ success: true, data: heures });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Erreur serveur lors de la récupération des heures de départ" });
    }
};
