const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

    console.log(req.params.user);
    console.log(req.params.password);

    let user = {
        firstName: 'Max',
        lastName: 'Mustermann'
    };

    let token = jwt.sign(user, process.env.SECRET);

    res.set('Set-Cookie', 'access_token=' + token + '; Secure; HttpOnly; Max-Age=86400; SameSite=Strict; Path=/');

    res.render('dashboard', {
        meta: {
            title: 'Home',
            description: 'Home'
        }
    });
};
