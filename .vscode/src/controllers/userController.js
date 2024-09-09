const pool = require('../config/db');

exports.getUsers = async (req, res) => {
    try {
        //const result = await pool.query('SELECT * FROM users');
        res.status(200);
        res.set('text');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    console.log("sent name: " + req.session.username);
    res.send(req.session.username);
};

exports.createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
        res.status(201);
    } catch (err) {
        res.status(500).json({ error: err.message });
        next();
    }
    req.session.authorized = true;
    req.session.username = name;
    res.set('text').send('http://localhost:3002/Mainreged');
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const result = await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [name, email, password, id]);
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



/*const logger = require('./logger');

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});*/