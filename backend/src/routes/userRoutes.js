const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const userController = require('../controllers/userController')

router.use(authMiddleware)

router.get('/me/profile', userController.getMyProfile);
router.put('/me/profile', userController.updateMyProfile);
router.put('/me/password', userController.changeMyPassword)
router.delete('/me', userController.deleteMyAccount)
router.get('/:id/profile', userController.getProfile)
module.exports = router;
