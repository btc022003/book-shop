/**
 * Created by yuluo on 16/7/2.
 *
 * kindeditor 编辑器使用demo
 * 访问地址为 :http://localhost:3000/demo/kindeditor
 * 当把数据提交之后会直接在提交页面把html代码的内容进行输出
 *
 */
var express = require('express');
var router = express.Router();

var fs = require('fs');

/**
 * 打开http://localhost:3000/demo/kindeditor链接时 显示此处内容
 */
router.get('/demo/kindeditor', function (req, res) {
    res.render('demo/kindeditor', {title: "kindeditor:文件上传demo"})
});

/**
 * form表单post提交的时候此处做接受处理
 */
router.post('/demo/kindeditor', function (req, res) {
    ////保存内容的文件名 保存在
    var fileName = './news/'+(new Date()).getTime()+'.json';
    fs.writeFileSync(fileName, JSON.stringify(req.body));

    var fileData = fs.readFileSync(fileName).toString();
    //console.log(fileData);
    var data = JSON.parse(fileData);
    res.render('demo/kindeditor_show',{title:'新闻标题',data:data});
});


module.exports = router;