exports.index = (req, res) => {
  res.render('home/index', {
    meta: {
      title: 'Home',
      description: 'Home'     
    }
  });
};