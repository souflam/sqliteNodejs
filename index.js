//importer le framework express
const express = require('express');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// we create an app object by calling the express() function
const app = express();

const path = require('path');

const cors = require('cors');


app.use(cors({
    origin: [
        "http://127.0.0.1:8080",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"]
}));


//adding a generic JSON and URL-encoded parser as a top-level middleware
app.use(bodyParser.json());



app.use(bodyParser.urlencoded({
    extend: true
}));

//include the users & contacts routes on index page
const users = require('./routes/users');
const contacts = require('./routes/contacts');

//include the routes as a middleware in our app object
app.use('/users', users);
app.use('/contacts', contacts);

//route of our home page
app.get('/home', function (req, res) {
    res.send('test nodejs');
});


//start our server on port 3000
app.listen(3000, function () {
    console.log('server demarrer 11')
});