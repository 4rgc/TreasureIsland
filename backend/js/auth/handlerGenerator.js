const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');
const DbWrapper = require('../db/dbWrapper')
const { getHashedPassword } = require('../auth/hasher')

class HandlerGenerator {
    login (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        if (username && password) {
            DbWrapper.getUserByUsername(username).then(res => {
                if(res.length != 0) {
                    let user = res[0]
                    if (username === user.username && getHashedPassword(password) === user.pwHash) {
                        let token = jwt.sign({username: username},
                        config.secret,
                        { expiresIn: '24h' // expires in 24 hours
                        }
                        );
                        // return the JWT token for the future API calls
                        res.setHeader('Set-Cookie', `access_token=${token}; HttpOnly; Path=/`);
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        });
                    } else {
                        res.statusCode = 403
                        res.json({
                            success: false,
                            message: 'Incorrect username or password'
                        });
                    }
                }
            })
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