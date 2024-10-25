const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const pool = require('./config/db.js');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const localhost = process.env.SERVER_DOMAIN;

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(fileUpload());
const publicHTMLPath = path.join(__dirname, '../public/html');
const publicDirPath = path.join(__dirname, '../public/');
const session = require('express-session');
const routes = require('./routes');
var url = require('url');
const { body, validationResult } = require('express-validator');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database:', res.rows);
    }
});

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    authorized: false
}));

const PORT = process.env.SERVER_PORT;
app.listen(PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);
    else console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

var siteUrls = [
    { pattern: '^/login/?$', restricted: false }
    , { pattern: '^/logout/?$', restricted: true }
    , { pattern: '^/$', restricted: false }
    , { pattern: '^/Mainreged$', restricted: true }
    , { pattern: '^/Main$', restricted: false }
    , { pattern: '^/regist$', restricted: false }
    , { pattern: '^/Routs$', restricted: false }
    , { pattern: '^/profile$', restricted: true }
    , { pattern: '^/Routsreged$', restricted: true }
];

function authorizeUrls(urls) {
    function authorize(req, res, next) {
        var requestedUrl = url.parse(req.url).pathname;
        for (var ui in urls) {
            var pattern = urls[ui].pattern;
            var restricted = urls[ui].restricted;
            if (requestedUrl.match(pattern)) {
                if (restricted) {
                    if (req.session.authorized) {
                        console.log("return_aut_confirm");
                        console.log(req.session.username);
                        next();
                        return;
                    }
                    else {
                        res.writeHead(303, { 'Location': '/Main' });
                        res.end();
                        console.log("return_aut_fail");
                        console.log(req.session.username);

                        return;
                    }
                }
                else {
                    console.log("aut_func_call");
                    next();
                    return;
                }
            }
        }
        console.log('common 404 for ', req.url);
        res.end('404: there is no ' + req.url + ' here');
    }
    return authorize;
}

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
    response.redirect('/Main');
});

app.use(express.static(publicDirPath));
app.use('/', authorizeUrls(siteUrls));
app.use(express.static(publicHTMLPath, { extensions: ['html'] }));



/*app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});*/