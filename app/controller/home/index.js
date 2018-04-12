module.exports = (req, res) => {

    console.log(req.body);


    return res.render('home/index', {
        signUpErrors: {
            attr: 'val'
        }
    });
};
