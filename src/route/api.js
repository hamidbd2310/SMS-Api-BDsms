const express = require('express');
const UserController = require('../controller/UserController');
const TodoController = require('../controller/TodoController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/registration', UserController.registration);
router.get('/verifyEmail/:email', UserController.verifyEmail);
router.get('/verifyMobile/:mobile', UserController.verifyMobile);
router.get('/verifyOTP/:mobile/:otp', UserController.verifyOTP);
router.get('/passwordReset/:mobile/:otp/:password', UserController.passwordReset);
router.post('/Login', UserController.Login);
router.get('/profileRead',AuthMiddleware, UserController.profileRead);
router.post('/profileUpdate', AuthMiddleware, UserController.profileUpdate);


router.post('/todo/create', AuthMiddleware, TodoController.create);
router.get('/todo/read', AuthMiddleware, TodoController.read);
router.post('/todo/update/:id', AuthMiddleware, TodoController.update);
router.get('/todo/delete/:id', AuthMiddleware, TodoController.delete);
router.get('/todo/complete/:id', AuthMiddleware, TodoController.complete);
router.get('/todo/cancel/:id', AuthMiddleware, TodoController.cancel);


module.exports = router;