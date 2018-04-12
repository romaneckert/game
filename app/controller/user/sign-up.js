const core = require('../../core');

module.exports = (req, res) => {
    if(req.body.password !== req.body.passwordRepeat) {
        return res.render('home/index', {
            errors: {
                form: {
                    signup: {
                        attributes: {
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
            }
        });
    }

    core.service.bcrypt.hash(req.body.password, 10, (err, hash) => {

        if(err) {
            console.log(err);
            return res.redirect('/');
        }

        var user = new core.model.user({
            email: req.body.email,
            password: hash,
            role: 'user'
        });

        user.save((err) => {
            if(err) {
                return res.render('home/index', {
                    errors: {
                        form: {
                            signup: {
                                errors: err.errors
                            }
                        }
                    }
                });
            }
            core.service.accessToken.addCookie(user,res);
            return res.redirect('/user/overview/');
        });
    });
}
