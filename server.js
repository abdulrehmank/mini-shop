import express from 'express';
import bodyParser from 'body-parser';
import routes from './app/routes';
import dbConfig from './config/mongoose.config.js';
import mongoose from 'mongoose';

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
routes(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the application."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
