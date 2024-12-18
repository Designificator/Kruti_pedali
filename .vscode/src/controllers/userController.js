const pool = require('../config/db');
require('dotenv').config();
//const localhost = process.env.SERVER_IP + ':' + process.env.SERVER_PORT.toString();
const localhost = process.env.SERVER_DOMAIN;

exports.getUsers = async (req, res) => {
    const { email, password } = req.body;
    console.log('password and email ', email, password);
    try {
        pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
            if (err) {
                console.error("Error in SQL query:", err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (result.rows != null && result.rows[0] != undefined) {
                res.status(200);
                req.session.authorized = true;
                req.session.userid = result.rows[0].id;
                console.log('user id: ', req.session.userid);
                req.session.username = result.rows[0].name;
                req.session.email = result.rows[0].email;
                req.session.password = result.rows[0].password;
                res.set('text').send('https://' + localhost + '/Mainreged');
            } else {
                console.log("User not found");
                res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSessionData = async (req, res) => {
    try {
        res.status(200).json({
            id: req.session.userid,
            name: req.session.username,
            email: req.session.email,
            password: req.session.password
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    console.log("sent name: " + req.session.username);
}

exports.createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    let unique = true;
    try {
        pool.query('SELECT * FROM users WHERE name = $1', [name], (err, result) => {
            if (err) {
                console.error("Error in SQL query:", err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (result.rows != null && result.rows[0] != undefined) {
                res.status(500).json({ error: "������������ � ����� ������ ��� ����" });
                unique = false;
                next();
            }
        });
    }
    catch (err) {
                res.status(500).json({ error: err.message });
                next();
    }
    if (unique) {
        try {
            const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
            res.status(201);
            req.session.authorized = true;
            req.session.username = name;
            req.session.email = email;
            req.session.password = password;
            req.session.userid = result.rows[0].id;
            res.set('text').send('http://' + localhost + '/Mainreged');
        } catch (err) {
            if (unique) {
                res.status(500).json({ error: err.message });
                next();
            }
        }
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log('PUT req: ', name, id);
    try {
        if (name != null) {
            result = await pool.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        }
        if (email != null) {
            result = await pool.query('UPDATE users SET email = $1 WHERE id = $2 RETURNING *', [email, id]);
        }
        if (password != null) {
            result = await pool.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [password, id]);
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeSession = async (req, res) => {
    try {
        delete req.session;
        res.writeHead(303, { 'Location': '/Main' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.sendCode = async (req, res) => {
    /*const { email } = req.body;
    try {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
            if (err) {
                console.error("Error in SQL query:", err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (result.rows != null && result.rows[0] != undefined) {
                res.status(200);
                req.session.userid = result.rows[0].id;
                console.log('user id: ', req.session.userid);
                req.session.username = result.rows[0].name;
                req.session.email = result.rows[0].email;
                req.session.password = result.rows[0].password;
                
            } else {
                console.log("User not found");
                res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }*/
}
exports.dropPassword = async (req, res) => { }
/*const logger = require('./logger');

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});*/