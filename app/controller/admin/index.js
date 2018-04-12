module.exports = (req, res) => {
    return res.render('admin/dashboard', {
        meta: {
            title: 'Admin Dashboard',
            description: 'Admin Dashboard'
        }
    });
};
