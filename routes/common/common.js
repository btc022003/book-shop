/**
 * Created by yuluo on 16/6/21.
 */
var express = require('express')

var fs = require('fs')

var router = express.Router()


/////文件上传
var multer = require('multer');
////设置图片上传后的保存路径 以及保存的文件名 使用了html图片上传插件
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        //console.log(Date.now()+file.originalname.slice('.').slice(-1))
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null, Date.now()+'.'+file.originalname.split('.').slice(-1))
    }
})

var upload = multer({ storage: storage })

router.post('/file/uploadfile',upload.single('file'),function(req,res){
    console.log(req)
    console.log(req.file)
    ////返回 路径+文件名
    res.json({url:'/uploads/'+req.file.filename});
})

module.exports = router