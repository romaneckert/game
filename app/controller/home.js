exports.index = (req, res) => {
    return res.render('home/index', {
      signUpErrors: {
        attr: 'val'
      }
  });
};
