const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProfileRoutes = require('./Routes/ProfileRouter');
const cookieParser = require('cookie-parser');

const App = express();

// Middleware
App.use(cors({origin: 'http://localhost:8081',
  credentials: true,}
));

App.use(express.json());
App.use(cookieParser());

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/DB')
    .then(() => {
        console.log("Connected to MongoDB");

    })
    .catch(err => console.error("Could not connect to MongoDB", err));

const conn=mongoose.connection;
conn.on("error", (err) => console.error.bind(console,"DB connection error"));
conn.once('open',()=>{console.log("Connected to DataBase.")});
App.use('/api/Users', ProfileRoutes)
const PORT = 5000;
App.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});