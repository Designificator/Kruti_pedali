const pool = require('../config/db');

exports.getComments = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM comments");
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createComment = async (req, res) => {
    const { username, text, rate } = req.body;
    try {
        const result = await pool.query('INSERT INTO comments (username, text, rate) VALUES ($1, $2, $3) RETURNING *', [username, text, rate]);
        res.status(201).end();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM comments WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};