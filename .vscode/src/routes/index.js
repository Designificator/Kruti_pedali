const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const commentController = require('../controllers/comentController');
const imageController = require('../controllers/imageController');

router.post('/users/login', userController.getUsers);
router.post('/users/login/sendcode', userController.sendCode);
router.post('/users/login/nopass', userController.dropPassword);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getSessionData);
router.get('/users/quit', userController.removeSession);

router.get('/comments', commentController.getComments);
router.post('/comments', commentController.createComment);
router.delete('/comments', commentController.deleteComment);

router.get('/images/:id', imageController.getImage);
router.post('/images', imageController.createImage);
router.put('/images/:id', imageController.changeImage);

module.exports = router;