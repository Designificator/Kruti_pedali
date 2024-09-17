const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/login', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getSessionData);

module.exports = router;