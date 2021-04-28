exports.index = function(req, res){
    
    let totalAmount = 0;
    let cartList = {};

    if (typeof(req.cookies.cartList) !== 'undefined'){
        cartList = JSON.parse(unescape(req.cookies.cartList));

        for(const key in cartList){
            totalAmount += parseInt(cartList[key].price);
        }
    }

    res.render('checkout/index.html', { cartList, totalAmount });
}