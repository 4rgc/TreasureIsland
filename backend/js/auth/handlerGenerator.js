const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

class HandlerGenerator {
    login (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        let mockedUsername = 'admin';
        let mockedPassword = 'password';

        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                let token = jwt.sign({username: username},
                config.secret,
                { expiresIn: '24h' // expires in 24 hours
                }
                );
                // return the JWT token for the future API calls
                res.setHeader('Set-Cookie', `access_token=${token}`)
                console.log('set the token')

                res.json({
                    success: true,
                    message: 'Authentication successful!'
                });
            } else {
                res.statusCode = 403
                res.json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.statusCode = 400
            res.json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }
}

module.exports = new HandlerGenerator();