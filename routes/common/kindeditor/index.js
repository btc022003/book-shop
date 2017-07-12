/**
 * Created by yuluo on 16/7/2.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');



router.post('/uploadImg', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //注意此处上传目录的路径
    form.uploadDir = __dirname+'/../../../public/upload';

    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }

        var image = files.imgFile;
        var path = image.path;
        path = path.replace(/\\/g, '/'); //正则替换反斜杠
        var url = '/upload' + path.substr(path.lastIndexOf('/'), path.length);
        console.log(url)
        var info = {
            "error": 0,
            "url": url
        };
        res.send(info);
    });
});

module.exports = router;
