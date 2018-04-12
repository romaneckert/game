const core = require('../../core');

module.exports = (req, res) => {

    core.model.user.findOne({email: req.body.email}, 'email password role', (err, user) => {

        if(err) {
            core.service.logger.error(err);
            res.redirect('/');
        }

        if(null === user) {
            res.render('home/index', {
                errors: {
                    form: {
                        signin: {
                            errors: [
                                'can not login, wrong credentials'
                            ]
                        }
                    }
                }
            });
        }

        core.service.bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err || !result) {
                core.service.logger.error(err);
                res.redirect('/');
            }

            core.service.accessToken.addCookie(user, res);

            res.redirect('/user/overview/');

        });
    });
}
