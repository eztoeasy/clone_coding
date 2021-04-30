const models = require('../../models');

exports.index = function (req, res) {

    let totalAmount = 0;
    let cartList = {};

    let shop_id = 0;
    let menuArray = [];

    if (typeof (req.cookies.cartList) !== 'undefined') {
        cartList = JSON.parse(unescape(req.cookies.cartList));

        for (const key in cartList) {
            totalAmount += parseInt(cartList[key].price);
            shop_id = cartList[key].shop_id;
            menuArray.push(parseInt(key));
        }
    }

    res.render('checkout/index.html', { cartList, totalAmount, shop_id, menuArray });
}

exports.post_complete = async function (req, res) {

    try {
        const checkout = await models.Checkout.create(req.body);
        const menuArray = JSON.parse(req.body.menuArray);

        async function asyncSetMenu(menu_id){
            try{

                const menu = await models.ShopsMenu.findByPk(menu_id);
                const status = await checkout.addMenu(menu);
                if (typeof status == 'undefined'){
                    throw `menu :: ${menu_id}가 존재하지 않습니다.`;
                }

            } catch (e){
                throw e;
            }
        }

        for (const menu_id of menuArray) {
            await asyncSetMenu(menu_id);
        }

        res.json({ message: 'success' });

    } catch (e) {
        console.log(e);
        res.json({ message: e });
    }
}

exports.get_success = function (req, res) {
    res.render('checkout/success.html');
}