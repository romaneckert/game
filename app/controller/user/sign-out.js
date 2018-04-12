module.exports = (req, res) => {
    res.cookie('access_token', '', {
        expires: new Date(),
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
    });
    return res.redirect('/');
}
