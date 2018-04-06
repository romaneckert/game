const config = require('../core/config');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

function addToken(user, res) {
    let token = jwt.sign({
        data: {
            user: user
        }
    },
    config.secret,
    {
        expiresIn: config.userTokenExpires
    });

    console.log(Date.now() + config.userTokenExpires);

    res.cookie('access_token', token, {
        expires: new Date(Date.now() + config.userTokenExpires),
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
    });
}

exports.signIn = (req, res) => {

    // TODO: get user from db
    console.log(req.params.user);
    console.log(req.params.password);

    let user = {
        firstName: 'Max',
        lastName: 'Mustermann',
        role: 'user'
    };

    res.redirect('/user/dashboard');
};

exports.signUp = (req, res) => {

    if(req.body.password !== req.body.passwordRepeat) {
        return res.render('home/index', {
            errors: {
                form: {
                    signup: {
                        password: {
                            message: 'passwords are not the same',
                            value: req.body.password
                        },
                        passwordRepeat: {
                            message: 'passwords are not the same',
                            value: req.body.passwordRepeat
                        }
                    }
                }
            }
        });
    }

    var user = new User({
        email: req.body.email,
        password: req.body.password,
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

        addToken(user,res);
        return res.redirect('/user/dashboard');
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
