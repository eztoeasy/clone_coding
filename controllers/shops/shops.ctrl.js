const models = require('../../models');

exports.get_shops_detail = async function(req, res){
    const shop = await models.Shops.findOne({
        where : { id : req.params.id },
        include : ['Menu', 'LikeUser' ]
    });

    let active = false;
    if (req.isAuthenticated()){
        const user = await models.User.findByPk(req.user.id);
        active = await shop.hasLikeUser(user);
    }

    const countLike = await shop.countLikeUser();

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

    res.render('shops/detail.html', { shop, countLike, active, cartLength, sameShops });
}

exports.post_shops_like = async function(req, res){

    try{

        const shop = await models.Shops.findByPk(req.params.shop_id);
        const user = await models.User.findByPk(req.user.id);
        const status = await shop.addLikeUser(user);

        res.json({
            status
        });
        //await user.addLikes(shop);
        
    } catch (e) {
        console.log(e);
    }

}

exports.delete_shops_like = async function(req, res){

    try{
        
        const shop = await models.Shops.findByPk(req.params.shop_id);
        const user = await models.User.findByPk(req.user.id);

        await shop.removeLikeUser(user);

        res.json({
            message : 'success'
        });

    } catch (e) {
        console.log(e);
    }

}