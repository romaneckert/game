const User = require('../../model/user');
const bcrypt = require('bcrypt');
const accessToken = require('../../helper/access-token');

module.exports = (req, res) => {
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
            accessToken({
                email: user.email,
                role: user.role
            },
            res);
            return res.redirect('/user/');
        });
    });
}
