const { body } = require('express-validator');

const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6, max: 128 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6, max: 128 })
];

module.exports = { registerValidation, loginValidation };
