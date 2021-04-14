const path = require('path');
const uploadDir = path.join( __dirname, '../uploads' );

//multer 셋팅
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, callback){
        // 이미지가 저장되는 도착지 지정
        callback(null, uploadDir);
    },
    filename : function(req, file, callback){
        // shops-날짜.jpg(png) 저장
        callback(null, 'shops-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
module.exports = multer( { storage: storage } );

