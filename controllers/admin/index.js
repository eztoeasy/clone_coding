const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

const paginate = require('express-paginate');

const cssrfProtection = require('../../middleware/csrf');
const upload = require('../../middleware/multer');
const loginRequired = require('../../middleware/loginRequired');


router.get('/shops', paginate.middleware(1, 50), ctrl.get_shops );

// router.use(loginRequired);

router.get('/shops/write', cssrfProtection, ctrl.get_shops_write );

router.post('/shops/write', upload.single('thumbnail'), cssrfProtection, ctrl.post_shops_write );

router.get('/shops/detail/:id', ctrl.get_shops_detail );

router.get('/shops/edit/:id', cssrfProtection, ctrl.get_shops_edit );

router.post('/shops/edit/:id', upload.single('thumbnail'), cssrfProtection, ctrl.post_shops_edit );

router.get('/shops/delete/:id', ctrl.get_shops_delete );

// 메뉴 작성
router.post('/shops/detail/:id', ctrl.add_menu);

// 메뉴 삭제
router.get('/shops/delete/:shop_id/:menu_id', ctrl.remove_menu);

// 결제 내역
router.get('/order', ctrl.get_order);
router.get('/order/edit/:id', ctrl.get_order_edit);
router.post('/order/edit/:id', ctrl.post_order_edit);

// 태그관련
router.post('/tag', ctrl.write_tag);
router.delete('/tag/:shop_id/:tag_id', ctrl.delete_tag);

module.exports = router;
