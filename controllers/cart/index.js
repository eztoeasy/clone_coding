const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    let totalAmount = 0;
    let cartList = {};

    if (typeof (req.cookies.cartList) !== 'undefined') {
        cartList = JSON.parse(unescape(req.cookies.cartList));

        for(const key in cartList){
            totalAmount += parseInt(cartList[key].price);
        }
    }

    res.render('cart/index.html', {cartList, totalAmount});
});

module.exports = router;