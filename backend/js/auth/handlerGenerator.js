const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');
const DbWrapper = require('../db/dbWrapper')
const { getHashedPassword } = require('../auth/hasher');
const { Db } = require('mongodb');

class HandlerGenerator {
    login (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        if (username && password) {
            DbWrapper.getUserByUsername(username).then(resultArray => {
                console.log(resultArray)
                if(resultArray.length != 0) {
                    let user = resultArray[0]
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

    register(req, res) {
        let username = res.body.username;
        let password = res.body.password;
        let email = res.body.email;

        if(username && password && email) {
            DbWrapper.getUserByUsername(username).then(resultArray => {
                if(resultArray.length == 0)
                    return DbWrapper.getUserByEmail(email).then(resultArray => {
                        if(resultArray.length == 0)
                            return true;
                    })
                return false;
            }).then(shouldCreate => {
                if(shouldCreate)
                    DbWrapper.insertUser({
                        username: username,
                        password: password,
                        email: email
                    }).then(() => {
                        res.json(
                            {
                                success: true
                            }
                        )
                })
                else
                    res.json(
                        {
                            success: false
                        }
                    )
            })
        }
    }
}

module.exports = new HandlerGenerator();