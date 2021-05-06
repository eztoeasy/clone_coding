const {Router} = require('express');
const router = Router();
const models = require('../../models');

router.get('/', async function(req, res){

    if (req.query.lat && req.query.lng){
        
    } else {
        attributes = '';
        order = '';
    }

    try{
        const shops = await models.Shops.findAll({

            ...(req.query.lat && req.query.lng ?
                {
                    attributes : {
                        include : [
                            [ 
                                models.sequelize.literal(`ST_DISTANCE_SPHERE( POINT(${req.query.lng}, ${req.query.lat}), geo)`), 'distance'
                            ]
                        ]
                    },
                    order : [ [models.sequelize.literal('distance'), 'asc'] ]
                } : '')
        });

        res.render('home.html', { shops });
    } catch(error){
        console.log(error);
    }
});

module.exports = router;