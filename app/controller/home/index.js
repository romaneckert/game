module.exports = (req, res) => {
    res.render('home/index', {
        signUpErrors: {
            attr: 'val'
        }
    });
};
