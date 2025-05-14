const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/notifications/me')
router.post('/notifications')
router.patch('/notifications/:id/read')
router.patch('/notifications/marks-all-read')
