const pool = require('../config/db');

exports.getImage = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM images WHERE userid = $1',
            [req.params.id]
        )
        res.status(200);
        res.set('Content-Type', result.rows[0].content_type)
        res.send(result.rows[0].image);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createImage = async (req, res) => {
    console.log('trying to create image:', req.body);
    try {
        const result = await pool.query(
            'INSERT INTO images (image, content_type, userid) VALUES ($1, $2, $3) RETURNING id',
            [req.files.image.data, req.files.image.mimetype, req.session.userid]
        )
        res.status(201);
        console.log(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.changeImage = async (req, res) => {

}