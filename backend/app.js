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
const socketIo = require('socket.io');

// Create HTTP server with Express
const server = http.createServer(app);
// Create socket.io instance listening to the HTTP server
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
const { singleUserByEmpreintId } = require("./controllers/userController");

// Database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));

// Middleware configuration
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

// Route configuration
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);
app.use('/api', horaireRoute);

// Error handling
app.use(errorHandler);

// Listen for incoming connections
io.on('connection', (socket) => {
  console.log('New client connected'); 
  
  // Check for delays every minute
  //const interval = setInterval(async () => {
    //try {
     // const currentDate = new Date();
     // const currentHour = currentDate.getHours();
     // const currentMinute = currentDate.getMinutes();

      // Fetch all employees from the database
      // const allEmployees = await User.find({});

      // // Check for delays for each employee
      // allEmployees.forEach(async (employee) => {
      //   const employeeHour = employee.startTime.getHours();
      //   const employeeMinute = employee.startTime.getMinutes();

      //   // Compare hours to detect delays
      //   if (currentHour > employeeHour || (currentHour === employeeHour && currentMinute > employeeMinute)) {
      //     // Employee is late, emit a notification
      //     io.emit('notification', `Employee ${employee.name} is late!`);
      //     console.log(`Employee ${employee.name} is late`);
      //   }
      // });

   // } catch (error) {
     /// console.error('Error checking delays:', error);
    //}
  //}, 60000); // Check every minute

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on("notification", async (msg) => {
    // Parse the message and perform actions based on the message
    //const message = JSON.parse(msg);
   // console.log("Received message:", message);

    /*if (message && message.id) {
      // Fetch user by empreinte_id
      const user = await singleUserByEmpreintId(message.id);
      console.log("Fetched user:", user);

      if (user) {
        io.emit('notification', `User ${user.name} is late!`);
      }
      
    }
    */
  });
});

// Port configuration
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
