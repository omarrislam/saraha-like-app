const router = require('express').Router();
const auth = require('../middleware/auth');
const { profileLink } = require('../controllers/profile.controller');

router.get('/link', auth, profileLink);

module.exports = router;
