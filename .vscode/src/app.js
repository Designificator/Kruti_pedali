const express = require('express');
const path = require('path');
const pool = require('./config/db.js');
require('dotenv').config();

const app = express();
const publicHTMLPath = path.join(__dirname, '../public/html');
const publicDirPath = path.join(__dirname, '../public/');

const routes = require('./routes');
const { body, validationResult } = require('express-validator');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database:', res.rows);
    }
});

const PORT = 3002;
app.listen(PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);
    else console.log(`Server running on port ${PORT}`);
});


app.use(express.json());

app.post('/users',
    body('email').isEmail(),
    body('name').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    routes
);

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//const logger = require('../logger.js');

app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.redirect('http://localhost:3002/regist.html');
});

app.use(express.static(publicHTMLPath, { extensions: ['html'] }));
app.use(express.static(publicDirPath));

/*app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});*/