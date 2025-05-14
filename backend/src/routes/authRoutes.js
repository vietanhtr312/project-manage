const router = require('express').Router();
const authValidator = require('../middlewares/authValidator')
const authController = require('../controllers/authController');

router.post('/register', authValidator.validateRegistration, authController.register);
router.post('/login', authValidator.validateLogin,authController.login);

module.exports = router;