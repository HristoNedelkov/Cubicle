const {Router} = require('express');
const router = Router();
const accessoreService = require('../services/accessoryService');

router.get('/create', (req,res)=> {
    res.render('createAccessory');

})

router.post('/create', (req,res)=> {
    accessoreService.createAccessory(req.body)
    .then(res=> {
        console.log('Added new accessory!')
    })
    .catch(() => res.status(500).end())
    res.redirect('/products')
    res.end()
})

module.exports = router;