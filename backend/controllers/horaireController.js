const moment = require("moment")
const HeureDépart = require('../models/horaireDépartModel');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const { singleUserByEmpreintId } = require('./userController');

/*exports.createHeure = async (req, res, next) => {
    try {
        const heureStr = req.body.Heure;
        const typeHeureStr = req.body.typeHeure;
        // Appeler la fonction pour récupérer l'utilisateur par empreinte_id
        const user = await exports.singleUserByEmpreintId(req.user.id);
        
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
*/

exports.createHeure = async (id,heureStr) => {
    try {
      
       // const user = singleUserByEmpreintId(id);
        // Recherche de la dernière entrée de l'utilisateur
        const derniereEntree = await HeureDépart.findOne({ user: id })
            .sort({ "Heure": -1 }) // Trie par ordre décroissant de la date/heure
            .limit(1);
            console.log("derniereEntree",derniereEntree)
            const today = new Date();
            const heureDate = new Date(today.toDateString() + ' ' + heureStr);
            if (isNaN(heureDate.getTime())) {
                return { success: false, error: "Format de date invalide pour heureDépart" };
            }


        if (!!derniereEntree?._id) {
            // Vérifier si la dernière entrée est d'aujourd'hui
            const lastEntryDate = new Date(derniereEntree.Heure);
            if (lastEntryDate.toDateString() === today.toDateString()) {
                if (derniereEntree?.typeHeure == "entrée") {
                    // Si c'est la première entrée de la journée, créez une entrée de départ
                    const heureDepart = await HeureDépart.create({
                        Heure:  heureDate,
                        typeHeure: "sortie",
                        user: id
                    });
                    return (heureDepart);
                } else {
                    // Si ce n'est pas la première entrée de la journée, créez une entrée de sortie
                    const heureSortie = await HeureDépart.create({
                        Heure: heureDate,
                        typeHeure: "entrée",
                        user: id
                    });
                    return(heureSortie);
                }
            } else {
                // Si ce n'est pas la première entrée de la journée, créez une entrée de sortie
                const heureSortie = await HeureDépart.create({
                    Heure: heureDate,
                    typeHeure: "entrée",
                    user: id
                });
                return(heureSortie);
            }
        } else {
           // création entrée
            const heureDepart = await HeureDépart.create({
                Heure:  heureDate,
                typeHeure: "entrée",
                user: id
            });
            return (heureDepart);
        }
    } catch (error) {
        console.log(error);
    }
}

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
                const heureJour = heure.Heure.getDay() + 1; // Récupérer le jour de la semaine de l'heure de départ
                const heureMois = heure.Heure.getMonth(); // Récupérer le mois de l'heure de départ
                const heureAnnee = heure.Heure.getFullYear();
                
            const jourIndex = validDays.indexOf(selectedDay.toLowerCase()); // Index du jour sélectionné
                const moisIndex = validMonths.indexOf(selectedMonth.toLowerCase()); // Index du mois sélectionné
                console.log("eee jours",heureJour, jourIndex)
                console.log("eee",heureMois,moisIndex)
                console.log("eee",heureAnnee)
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
        const derniereEntree = await HeureDépart.find({ user: req.params._id, typeHeure: 'entrée' })
            /* .sort({ "Heure": -1 }) // Trie par ordre décroissant de la date/heure
            .limit(1); */
            console.log("hhhh", req.params._d)
        // Recherche de la dernière sortie de l'utilisateur
        const derniereSortie = await HeureDépart.find({ user: req.params._id, typeHeure: 'sortie' })

            .sort({ "Heure": -1 }) // Trie par ordre décroissant de la date/heure
            .limit(1);
            console.log("sort",derniereSortie)
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
        const heures = await HeureDépart.find(req.body).populate('user');
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

// Contrôleur pour calculer le pourcentage de présence des employés en regroupant toutes les heures de présence
exports.calculerPourcentagePresence = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs
        const users = await User.find();

        // Récupérer toutes les heures de départ
        const heuresDepartEntered = await HeureDépart.find({ typeHeure: 'entrée' });
      //  const heuresDepart = heuresDepartEntered?.filter(h=>moment(h?.createdAt).format("YYYY/MM/DD") >= moment().startOf("month").format("YYYY/MM/DD"))

        const startOfMonth = moment().startOf("month").format("YYYY/MM/DD");
        
        const heuresDepart = [];
        const seenUsers = {};
        
        // Filtrer les heures de départ pour conserver seulement une par utilisateur par jour
        heuresDepartEntered.forEach(heure => {
          const createdAtDate = moment(heure.createdAt).format("YYYY/MM/DD");
          
          if (createdAtDate >= startOfMonth) {
            const userId = heure.userId; // Assurez-vous que userId est la clé unique pour chaque utilisateur
            if (!seenUsers[userId]) {
              seenUsers[userId] = {};
            }
        
            if (!seenUsers[userId][createdAtDate]) {
              seenUsers[userId][createdAtDate] = true;
              heuresDepart.push(heure);
            }
          }
        });
        
        console.log(heuresDepart);
        
        // Nombre total d'utilisateurs
        const totalUsers = users?.filter(u=>!!u?.CIN)?.length;
        console.log("usersss",totalUsers)

        // Nombre total d'heures enregistrées
        const totalHeuresEnregistrees = heuresDepart?.length;
        console.log("totalHeuresEnregistrees",totalHeuresEnregistrees)

        if (totalUsers === 0 || totalHeuresEnregistrees === 0) {
            return res.status(200).json({ pourcentagePresence: 0 });
        }

        // Calculer le pourcentage de présence
        const pourcentagePresence = ((totalHeuresEnregistrees / totalUsers) / moment().daysInMonth())* 100;

        res.json({ pourcentagePresence: pourcentagePresence.toFixed(2), totalHeuresEnregistrees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors du calcul du pourcentage de présence." });
    }
};