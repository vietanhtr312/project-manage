const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const notificationController = require('../controllers/notificationController')
router.use(authMiddleware);

router.get('/me', notificationController.getUserNotifications)
router.post('/', notificationController.createNotification)
router.patch('/:id/marks-read', notificationController.markAsRead)
router.patch('/marks-all-read', notificationController.markAllAsRead)

module.exports = router;