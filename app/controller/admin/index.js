module.exports = (req, res) => {
    res.render('admin/dashboard', {
        meta: {
            title: 'Admin Dashboard',
            description: 'Admin Dashboard'
        }
    });
};
