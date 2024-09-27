const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const commentController = require('../controllers/comentController');

router.post('/users/login', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getSessionData);

router.get('/comments', commentController.getComments);
router.post('/comments', commentController.createComment);
router.delete('/comments', commentController.deleteComment);

module.exports = router;