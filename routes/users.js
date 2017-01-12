// 前台页面用户部分的路由...
var express = require('express')
var router = express.Router()

router.get('/reg',(req,res)=>{
	res.render('users/reg')
})
router.post('/reg',(req,res)=>{
	res.json({
		status:"y",
		msg:"注册成功"
	})
})
module.exports = router