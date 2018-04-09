const User = require('../../model/user');
const bcrypt = require('bcrypt');
const accessToken = require('../../helper/access-token');

module.exports = (req, res) => {
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

            accessToken({
                email: user.email,
                role: user.role
            }, res);
            res.redirect('/user/');

        });
    });
}
