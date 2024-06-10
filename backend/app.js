const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const WebSocket = require('ws');
const { createHeure } = require("./controllers/horaireController");
const { singleUserByEmpreintId } = require("./controllers/userController");
const socketIo = require('socket.io');
const http = require('http');
const schedule = require('node-schedule'); // Ajout du module de planification


// Import necessary models
const Heure = require('./models/horaireDépartModel');
const User = require('./models/userModel');

const gateway = 'ws://192.168.1.9:81/';

let client;
let reconnectInterval = 2000;

function initWebSocket() {
  console.log('Trying to open a WebSocket connection...');

  client = new WebSocket(gateway);

  client.on('open', () => {
    console.log('WebSocket Client Connected');
    reconnectInterval = 2000;
    sendNumber();
  });

  client.on('error', (error) => {
    console.error('Connection Error:', error.message);
   // attemptReconnect();
  });

  client.on('close', () => {
    console.log('WebSocket Client Closed');
   // attemptReconnect();
  });

  client.on('message', async (message) => {
    try {
      const CIN = JSON.parse(message)?.id;
      if (CIN) {
        console.log('Received CIN:', CIN);
        const user = await singleUserByEmpreintId(CIN);
        if (user?.id) {
          console.log('User found:', user);
          const heureStr = new Date().toTimeString().split(' ')[0];
          const heure = await createHeure(user.id, heureStr);
          const expectedDateTime = '11:00:00';

          console.log("Heure enregistrée:", heure);

          if (heure?.id) {
            if (heure.typeHeure === "entrée") {
              // Convertir les chaînes de caractères en objets Date
              const [heureStrHour, heureStrMinute, heureStrSecond] = heureStr.split(':').map(Number);
              const [expectedHour, expectedMinute, expectedSecond] = expectedDateTime.split(':').map(Number);

              // Créer des objets Date
              const now = new Date();
              const actualDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), heureStrHour, heureStrMinute, heureStrSecond);
              const expectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), expectedHour, expectedMinute, expectedSecond);

              // Calculer le retard en millisecondes
              const delayMs = actualDate - expectedDate;

              if (delayMs > 0) {
                // Convertir le retard en heures, minutes et secondes
                const delayHours = Math.floor(delayMs / (1000 * 60 * 60));
                const delayMinutes = Math.floor((delayMs % (1000 * 60 * 60)) / (1000 * 60));
                const delaySeconds = Math.floor((delayMs % (1000 * 60)) / 1000);
                const delayString = `${delayHours} heures, ${delayMinutes} minutes et ${delaySeconds} secondes`;

                const notification = `L'utilisateur ${user.firstName} est en retard de ${delayString}`;
                console.log("Notification envoyée : ", notification);
                io.emit('notification', { notification });
              } else {
                const notification = `L'utilisateur ${user.firstName} fait le pointage de ${heure.typeHeure}`;
                console.log("Notification envoyée : ", notification);
                io.emit('notification', { notification });
              }
            } else {
              const notification = `L'utilisateur ${user.firstName} fait le pointage de ${heure.typeHeure}`;
              console.log("Notification envoyée : ", notification);
              io.emit('notification', { notification });
            }
          }
        } else {
          console.log("Utilisateur non trouvé pour empreinte_id:", CIN);
        }
      } else {
        console.log("Pas de empreinte id", message.toString());
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  });
}

function attemptReconnect() {
  console.log('Reconnecting in', reconnectInterval, 'ms...');
  setTimeout(() => {
    console.log('Reconnecting...');
    initWebSocket();
    reconnectInterval = Math.min(reconnectInterval * 2, 60000);
  }, reconnectInterval);
}

function sendNumber() {
  if (client.readyState === WebSocket.OPEN) {
    const number = Math.round(Math.random() * 0xFFFFFF);
    client.send(number.toString());
    setTimeout(sendNumber, 1000);
  }
}

initWebSocket();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');
const horaireRoute = require('./routes/horaireRoute');

// Connect to the database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("Base de données connectée"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);
app.use('/api', horaireRoute);

app.use(errorHandler);




const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
