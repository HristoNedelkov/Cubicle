const { Router } = require('express');
const router = Router();

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const isAuth = require('./middlewares/isAuthenticated');
const isGuest = require('./middlewares/isGuest');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.use('/accessories',isAuth, accessoryController);


router.get('*', (req, res) => {
     res.render('404');
});

module.exports = router;