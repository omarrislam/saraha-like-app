const { param } = require('express-validator');

const userIdParamValidation = [
  param('userId').isMongoId()
];

module.exports = { userIdParamValidation };
