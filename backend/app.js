const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
const path = require('path');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const http = require('http');
/* const socketIo = require('socket.io');

// Créer le serveur HTTP avec Express
const server = http.createServer(app);
// Créer une instance de socket.io en écoutant le serveur HTTP
const io = socketIo(server,{
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');
const horaireRoute = require('./routes/horaireRoute'); // Corrigez l'espace supplémentaire ici
const { singleUserByEmpreintId } = require("./controllers/userController");

// Connexion à la base de données
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log("Base de données connectée"))
.catch((err) => console.log(err));

// Configuration du middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors(  {
  origin: 'http://localhost:3001'
}));

// Configuration des routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);
app.use('/api', horaireRoute);

// Gestion des erreurs
app.use(errorHandler);
/* // Écouter les connexions entrantes
io.on('connection', (socket) => {
  console.log('New client connected'); */

/*   // Définir l'heure de départ fixe
  const fixedHour = 14; // Heure fixe pour la comparaison
  const fixedMinute = 0; // Minute fixe pour la comparaison */

  // Vérifier les retards toutes les minutes
  const interval = setInterval(async () => {
    try {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      // Récupérer tous les employés depuis la base de données
      // const allEmployees = await User.find({});

      // // Parcourir tous les employés pour vérifier les retards
      // allEmployees.forEach(async (employee) => {
      //   const employeeHour = employee.startTime.getHours();
      //   const employeeMinute = employee.startTime.getMinutes();

      //   // Comparer les heures pour détecter les retards
      //   if (currentHour > employeeHour || (currentHour === employeeHour && currentMinute > employeeMinute)) {
      //     // Il y a un retard pour cet employé, émettre une notification
      //     io.emit('notification', `L'employé ${employee.name} est en retard !`);
      //     console.log(`L'employé ${employee.name} est en retard`);
      //   }
      // });
    } catch (error) {
      console.error('Erreur lors de la vérification des retards :', error);
    }
  }, 60000); // Vérification toutes les minutes

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
   
  });

  socket.on("notification",(msg) => {
  //  const message = JSON.parse(msg)
    console.log("msg",msg)
   // if(!!message?.id){
      // search user by empreinte_id
      // const user = singleUserByEmpreintId(empreinte_id);
      // console.log("user",user)
   // }
  })
});

// Désormais, vous n'avez plus besoin d'écouter les connexions Express ici
// Supprimez cette partie
// Configuration du port
const port = process.env.PORT || 3000;

// Désormais, utilisez votre serveur Socket.IO pour écouter les connexions
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});