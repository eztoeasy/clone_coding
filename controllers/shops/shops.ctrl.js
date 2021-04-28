const models = require('../../models');

exports.get_shops_detail = async function(req, res){
    const shop = await models.Shops.findOne({
        where : { id : req.params.id },
        include : ['Menu']
    });

    let cartList = {};
    let cartLength = 0;
    let sameShops = true;

    if (typeof (req.cookies.cartList) !== 'undefined') {
        cartList = JSON.parse(unescape(req.cookies.cartList));
        cartLength = Object.keys(cartList).length;

        for (let key in cartList){
            if (cartList[key].shop_id !== parseInt(req.params.id)){
                sameShops = false;
            }
        }
    }

    res.render('shops/detail.html', { shop, cartLength, sameShops });
}