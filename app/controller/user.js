const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.signIn = (req, res) => {

    // TODO: get user from db
    console.log(req.params.user);
    console.log(req.params.password);

    const tokenExpiresIn = 86400;

    let user = {
        firstName: 'Max',
        lastName: 'Mustermann',
        role: 'user'
    };

    let token = jwt.sign({
        data: {
            user: user
        }
    },
    process.env.SECRET,
    {
        expiresIn: tokenExpiresIn
    });

    res.set('Set-Cookie', 'access_token=' + token + '; Secure; HttpOnly; Max-Age=' + tokenExpiresIn + '; SameSite=Strict; Path=/');

    res.redirect('/user/dashboard');
};

exports.signUp = (req, res) => {

    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err) => {
        console.log(err.errors);
    });

    res.redirect('/');

}

exports.dashboard = (req, res) => {
    res.render('user/dashboard', {
        meta: {
            title: 'User Dashboard',
            description: 'User Dashboard'
        }
    });
};
