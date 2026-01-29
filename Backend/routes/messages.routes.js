const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { sendMessageValidation, messageIdValidation } = require('../validation/message.validation');
const { sendMessage, inbox, deleteMessage } = require('../controllers/messages.controller');

router.post('/send/:userId', sendMessageValidation, validate, sendMessage);
router.get('/inbox', auth, inbox);
router.delete('/:id', auth, messageIdValidation, validate, deleteMessage);

module.exports = router;
