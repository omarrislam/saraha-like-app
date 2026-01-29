const { body, param } = require('express-validator');

const sendMessageValidation = [
  param('userId').isMongoId(),
  body('body').trim().isLength({ min: 1, max: 2000 })
];

const messageIdValidation = [
  param('id').isMongoId()
];

module.exports = { sendMessageValidation, messageIdValidation };
