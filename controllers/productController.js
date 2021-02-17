const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('./helpers/productHelpers');
const authService = require('../services/authService');

const isAuth = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');


const router = Router();

router.get('/', async (req, res) => {
    try {
        let name = await authService.getName(req.user._id)

        productService.getAll(req.query)
            .then(products => {
                res.render('home', { title: 'Browse', products, name });
            })
            .catch(e => {
                res.status(500).end()
            })
    } catch (e) {
        productService.getAll(req.query)
            .then(products => {
                res.render('home', { title: 'Browse', products, });
            })
            .catch(e => {
                res.status(500).end()
            })
    }
});


router.get('/create', isAuth, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', isAuth, validateProduct, (req, res) => {
    console.log(req.user)
    productService.create(req.body, req.user)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getOne(req.params.productId)
    let accessories = await accessoryService.getAllOfCube(req.params.productId)
    await res.render('details', { title: 'Product Details', product, accessories })

})


router.get('/:productId/attach', isAuth, async (req, res) => {
    let id = req.params.productId
    let product = await productService.getOne(id)
    let accessories = await accessoryService.getAllWithoutOwned(product.accessories)

    res.render('attachAccessory', { product, accessories })

})

router.post('/:productId/attach', isAuth, (req, res) => {
    let accessoryId = req.body.accessory
    let cubeId = req.params.productId

    accessoryService.addAccessory(cubeId, accessoryId)
        .then((result) => {
            console.log(result)
            console.log('LOLLL!')
            res.redirect(`/products/details/${cubeId}`)
        })
        .catch(e => {
            res.status(500); console.log(e)
        })
})

router.get('/:productId/edit', isAuth, (req, res) => {

    productService.getOne(req.params.productId).then(product => {
        res.render('editCube', product)
    })
})

router.post('/:productId/edit', isAuth, validateProduct, (req, res) => {
    //validate data"req.body "

    productService.updateOne(req.params.productId, req.body)
        .then(resp => {
            console.log('Cube with id: ' + resp._id + ' had been updated!')
            res.redirect('/products')
        })
        .catch(e => {
            console.log(e)
        })
})

router.get('/:productId/delete', isAuth, (req, res) => {
    productService.deleteOne(req.params.productId)
        .then(() => {
            res.redirect('/products')
        })
        .catch(e => {
            console.log(e)
        })
})
router.get('/my-products', (req, res) => {
    
    productService.getOwned(req.user._id)
        .then(products => {
            res.render("home", { products })
        })


})
module.exports = router;
