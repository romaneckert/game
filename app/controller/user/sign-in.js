const core = require('../../core');

module.exports = (req, res) => {
    core.model.user.findOne({email: req.body.email}, 'email password role', (err, user) => {

        if(err) {
            console.log(err);
            return res.redirect('/');
        }

        core.service.bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err || !result) {
                console.log(err);
                return res.redirect('/');
            }

            core.service.accessToken({
                email: user.email,
                role: user.role
            }, res);

            res.redirect('/user/');

        });
    });
}
