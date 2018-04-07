const config = require('../core/config');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const bcrypt = require('bcrypt');

function setAccessTokenCookie(user, res) {
    let accessToken = jwt.sign({
        data: {
            user: user
        }
    },
    config.secret,
    {
        expiresIn: config.userTokenExpires
    });

    res.cookie('access_token', accessToken, {
        expires: new Date(Date.now() + config.userTokenExpires * 1000),
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
    });
}

exports.signIn = (req, res) => {

    User.findOne({email: req.body.email}, 'email password role', (err, user) => {

        if(err) {
            console.log(err);
            return res.redirect('/');
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err || !result) {
                console.log(err);
                return res.redirect('/');
            }
            
            setAccessTokenCookie({
                email: user.email,
                role: user.role
            }, res);
            res.redirect('/user/dashboard');

        });
    });

};

exports.signUp = (req, res) => {

    if(req.body.password !== req.body.passwordRepeat) {
        return res.render('home/index', {
            errors: {
                form: {
                    signup: {
                        password: {
                            message: 'passwords are not the same',
                            value: ''
                        },
                        passwordRepeat: {
                            message: 'passwords are not the same',
                            value: ''
                        }
                    }
                }
            }
        });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {

        if(err) {
            console.log(err);
            return res.redirect('/');
        }

        var user = new User({
            email: req.body.email,
            password: hash,
            role: 'user'
        });
    
        user.save((err) => {
            if(err) {
                return res.render('home/index', {
                    errors: {
                        form: {
                            signup: err.errors
                        }
                    }
                });
            } 
    
            setAccessTokenCookie({
                email: user.email,
                role: user.role
            },
            res);
            return res.redirect('/user/dashboard');
        });
    });
}

exports.signOut = (req, res) => {

    res.cookie('access_token', '', {
        expires: new Date(),
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
    });

    res.redirect('/');
};

exports.dashboard = (req, res) => {
    res.render('user/dashboard', {
        meta: {
            title: 'User Dashboard',
            description: 'User Dashboard'
        }
    });
};
