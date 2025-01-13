const mongoose = require('mongoose');

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/DB')
    .then(() => {
        console.log("Connected to MongoDB");

        // Specify the database to use
        // const db = mongoose.connection.useDb('DB'); // Replace 'DB' with your actual database name
        // console.log(`Using database: ${db.name}`);
    })
    .catch(err => console.error("Could not connect to MongoDB", err));

// Define the schema
