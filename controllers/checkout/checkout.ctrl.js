const { checkout } = require('.');
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

exports.get_complete = async (req, res) => {

    const {Iamporter} = require('iamporter');
    const iamporter = new Iamporter({
        apiKey: process.env.IAMPORT_APIKEY,
        secret: process.env.IAMPORT_SECRET
    });

    try {

        const iamportData = await iamporter.findByImpUid(req.query.imp_uid);
        const checkout = await models.Checkout.create({
            imp_uid: iamportData.data.imp_uid,
            merchant_uid: iamportData.data.merchant_uid,
            paid_amount: iamportData.data.amount,
            apply_num: iamportData.data.apply_num,

            buyer_email: iamportData.data.buyer_email,
            buyer_name: iamportData.data.buyer_name,
            buyer_tel: iamportData.data.buyer_tel,
            buyer_addr: iamportData.data.buyer_addr,
            buyer_postcode: iamportData.data.buyer_postcode,
            shop_id: req.query.shop_id,
            status: "결재완료"
        });

        const menuArray = JSON.parse(req.query.menuArray);
        async function asyncSetmenu(menu_id){
            try{
                const menu = await models.ShopsMenu.findByPk(menu_id);
                const status = await checkout.addMenu(menu);
                if (typeof status === 'undefined'){
                    throw `menu :: ${menu_id}가 존재하지 않습니다.`;
                }
            } catch (e){
                throw e;
            }
        }

        for (const menu_id of menuArray) 
            await asyncSetmenu(menu_id);

        res.redirect('/checkout/success');

    } catch (e) {
        console.log(e);
    }
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

