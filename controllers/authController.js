const { Router } = require('express');
const router = Router();
const authService = require('../services/authService');
const validator = require('validator');
const { check, validationResult } = require('express-validator');


//const isAuth = require()
const { COOKIE_NAME } = require('../config/index');

const isAuth = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { findByIdAndUpdate } = require('../models/User');

router.get('/login', isGuest, (req, res) => {
    res.render('login')
    req.user
});
router.post('/login', isGuest, async (req, res) => {

    try {
        let token = await authService.login(req.body)
        res.cookie('USER_SESSION', token)
        res.redirect('/products')
    } catch (error) {
        console.log(error)
        res.render('login', { error })
    }
})
router.get('/register', isGuest, (req, res) => {
    res.render('register');
});


router.post(
    '/register',
    isGuest,
    check('password', 'pass is too short').isLength({ min: 5, max: 100 }),
    check('username','Enter Username').notEmpty(),
    async (req, res) => {
        try {
            let result = validationResult(req)
            
            if(result.errors.length > 0) {
                return res.render('register', { errors: result.errors, username: req.body.username, })

            }

            await authService.register(req.body)
            res.redirect('/auth/login')
        } catch (error) {
            let errors = Object.keys(error.errors).map(x => ({msg: error.errors[x].message}));
            res.render('register', { errors })
        }
    });

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(COOKIE_NAME)
    res.redirect('/products')
})

module.exports = router;