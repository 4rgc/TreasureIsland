const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var path = require('path');
const handlers = require('../js/auth/handlerGenerator');
const middleware = require('../js/auth/middleware')

/* GET home page. */
router.post('/authorize', handlers.login);
router.get('/deauthorize', middleware.checkToken, logout)
router.post('/register', handlers.register)

function logout (req, res, next) {
    let token = req.cookies['access_token']
    console.log(token);

    // return the JWT token for the future API calls
    res.clearCookie('access_token', { domain: 'api.treasureisland.tech', path: '/' });

    res.json({
        success: true,
        message: 'Deauthorized!'
    });
}

module.exports = router;
