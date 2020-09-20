var express = require('express');
var router = express.Router();
var path = require('path');
const handlers = require('../js/auth/handlerGenerator');

/* GET home page. */
router.post('/', handlers.login);

module.exports = router;
