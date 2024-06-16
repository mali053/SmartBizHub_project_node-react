const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validationMiddleware');

router.get('/:id', userController.getUser);
router.post('/signup', validateUser, userController.signup);
router.post('/login', userController.login);
router.put('/:id', validateUser, userController.update);

module.exports = router;
