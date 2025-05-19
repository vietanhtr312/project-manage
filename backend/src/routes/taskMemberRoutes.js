const express = require('express');
const router = express.Router();
const taskMemberController = require('../controllers/taskMemberController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.post('/tasks/:id/members', taskMemberController.addTaskMember);
router.get('/tasks/:id/members', taskMemberController.getTaskMembers);
router.delete('/tasks/:id/members/:userId', taskMemberController.removeTaskMember);

module.exports = router;