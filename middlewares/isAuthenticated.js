module.exports = (req, res, next) => {
    if (!req.user) {
        console.log('Please, log in!');
        return res.redirect('/auth/login');
    }

    next();
}