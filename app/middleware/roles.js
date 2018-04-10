// middleware for doing role-based permissions
module.exports = (roles) => {

    const isAllowed = (role) => {
        return roles.indexOf(role) > -1;
    }

    return (req, res, next) => {
        if (req.user && isAllowed(req.user.role)) {
            next();
        } else {
            res.redirect('/');
        }
    }

}
