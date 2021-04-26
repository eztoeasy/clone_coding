const models = require('../../models');

exports.get_shops_detail = async function(req, res){
    const shop = await models.Shops.findOne({
        where : { id : req.params.id },
        include : ['Menu']
    });

    res.render('shops/detail.html', { shop });
}