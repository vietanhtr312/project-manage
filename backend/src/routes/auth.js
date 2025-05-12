const router = require('express').Router();
const authValidator = require('../middlewares/authValidator')
const authController = require('../controllers/authControler');

router.post('/auth/register', authValidator.validateRegistration, authController.register);
router.post('/auth/login', authValidator.validateLogin,authController.login);

module.exports = router;