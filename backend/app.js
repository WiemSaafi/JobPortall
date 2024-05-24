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
const WebSocket = require('ws');
const { createHeure } = require("./controllers/horaireController");
const http = require('http');
//const { WebSocketServer } = require('ws')
var WebSocketClient = require('websocket').w3cwebsocket;

require('dotenv').config();

const gateway = 'ws://192.168.3.81:81/'; // Replace with your WebSocket server address

let client;
let reconnectInterval = 2000; // Initial reconnection interval in milliseconds

// Initialize WebSocket connection
function initWebSocket() {
  console.log('Trying to open a WebSocket connection...');

  client = new WebSocket(gateway);

  client.on('open', () => {
    console.log('WebSocket Client Connected');
    reconnectInterval = 2000; // Reset the interval on successful connection
    sendNumber();
  });

  client.on('error', (error) => {
    console.error('Connection Error:', error.message);
    attemptReconnect();
  });

  client.on('close', () => {
    console.log('WebSocket Client Closed');
    attemptReconnect();
  });

  // client.on('message', (message) => {
  //   const data = message.toString() // Convert buffer to string
  //   console.log("Received nn: '" + data + "'");
  //   //console.log("Received id: '" + JSON.parse(message)?.id);
  //   const id = 8;

  //   // Handle the received message
  //   handleMessage(data);
  // });

  // setTimeout(() => {
  //   client.emit('message', '{"id":"807"}'); 
  // }, 1000);


  client.on('message', async (message) => {
    // const CIN= message.toString(); // Convert buffer to string
    console.log("pas de empreinte id", message.toString())

    try {
      const CIN = JSON.parse(message)?.id;
      if(!!CIN){
        const user = await singleUserByEmpreintId(CIN);
        if (user) {
            const heureStr = new Date().toTimeString().split(' ')[0]; // Utiliser l'heure actuelle
            const heure = await createHeure(user?.id, heureStr);
            console.log("Heure enregistrée:", heure);
        } else {
            console.log("Utilisateur non trouvé pour empreinte_id:", CIN);
        }
      }else{
        console.log("pas de empreinte id", message.toString())
      }
       
    } catch (error) {
        console.error("Erreur:", error);
    }
});
}



// Attempt to reconnect after a delay
function attemptReconnect() {
  console.log('Reconnecting in', reconnectInterval, 'ms...');
  setTimeout(() => {
    console.log('Reconnecting...');
    initWebSocket();
    // Increase the interval for the next reconnection attempt
    reconnectInterval = Math.min(reconnectInterval * 2, 60000); // Cap at 1 minute
  }, reconnectInterval);
}

// Send a number through WebSocket
function sendNumber() {
  if (client.readyState === WebSocket.OPEN) {
    const number = Math.round(Math.random() * 0xFFFFFF);
    client.send(number.toString());
    setTimeout(sendNumber, 1000);
  }
}

// Handle received WebSocket message
function handleMessage(message) {
  console.log('Handling message:', message);
  // Implement your logic to handle the received message
  // Example: createHeure(message);
}



// Initialize the WebSocket connection
initWebSocket();
  
// Créer le serveur HTTP avec Express
const server = http.createServer(app);
// Créer une instance de socket.io en écoutant le serveur HTTP
/*const io = socketIo(server,{
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});
*/
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

// Déplacer le code ci-dessous à l'intérieur du bloc io.on('connection', (socket) => { ... })

// socket.on('disconnect', () => {
//   console.log('Client déconnecté');
// });

// socket.on("notification",(msg) => {
//  const message = JSON.parse(msg)
//  console.log("msg",msg)
//  if(!!message?.id){
//    search user by empreinte_id
//    const user = singleUserByEmpreintId(empreinte_id);
//    console.log("user",user)
//  }
// });

// Désormais, vous n'avez plus besoin d'écouter les connexions Express ici
// Supprimez cette partie
// Configuration du port


/*
function initWebSocket() {
  console.log('Trying to open a WebSocket connection...');
   websocket = new WebSocket(gateway);
   websocket.on('open', onOpen);
  websocket.on('close', onClose);
  websocket.on('message', onMessage);
  websocket.on("notification",onMessage)
}

function onOpen(event) {
  console.log('Connection DONE', event);
}

function onClose() {
  console.log('Connection closed');
  setTimeout(initWebSocket, 2000);
}

function onMessage(data) {
  console.log('Message received: ', data);
  // Insérer le traitement de votre message ici
  //createHeure(id)
}

// async function onMessage(data) {
//   console.log('Message received: ', data);

//   // Assumant que 'data' contient le nom de l'utilisateur
//   const id = data; // Adaptez ceci selon le format de votre message
//   console.log('Processing ID: ', id); // Ajoutez cette ligne pour déboguer
//   try {
//     const result = await createHeure(id);
//     console.log('createHeure result:', result);
//   } catch (error) {
//     console.error('Error in createHeure:', error);
//   }
// }

initWebSocket();
*/

// function initWebSocket() {
//   console.log('Trying to open a WebSocket connection...');
//   const sockserver = new WebSocketServer({ port: 81 })
//   sockserver.on('connection', ws => {
//     console.log('New client connected!')
//     ws.send('connection established')
//     ws.on('close', () => console.log('Client has disconnected!'))
//     ws.on('message', data => {
//       sockserver.clients.forEach(client => {
//         console.log(`distributing message: ${data}`)
//         client.send(`${data}`)
//       })
//     })
//     ws.onerror = function () {
//       console.log('websocket error')
//     }
//    })
//   // websocket = new WebSocket(gateway);
//   // websocket.on('open', onOpen);
//   // websocket.on('close', onClose);
//   // websocket.on('message', onMessage);

// }

// function onOpen(event) {
//   console.log('Connection opened' , event);
// }

// function onClose(event) {
//   console.log('Connection closed' , event);
//   setTimeout(initWebSocket, 2000);
// }

// async function onMessage(event) {
//  console.log('Message received: ', event?.data);
  
    // Assumant que 'data' contient le nom de l'utilisateur
   // const id = data; // Adaptez ceci selon le format de votre message
  //   try {
  //  const result = await createHeure(id);
  //   console.log('createHeure result:', result);
  //   } catch (error) {
  //   console.error('Error in createHeure:', error);
  //  }
//}

//initWebSocket();
// client.connect(gateway, 'echo-protocol');

// Vérifier les retards toutes les minutes
const delayCheckInterval = setInterval(async () => {
  try {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
  } catch (error) {
    console.error('Erreur lors de la vérification des retards :', error);
  }
}, 60000); // Vérification toutes les minutes


const port = process.env.PORT || 3000;

// Désormais, utilisez votre serveur Socket.IO pour écouter les connexions
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
