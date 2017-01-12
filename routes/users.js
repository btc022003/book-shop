// 前台页面用户部分的路由...
var express = require('express')
var router = express.Router()
var UserDal = require('../common/user').UserDal
var userDal = new UserDal()

router.get('/reg',(req,res)=>{
	res.render('users/reg')
})
router.post('/reg',(req,res)=>{
	userDal.validateMobileCanReg(req.body.mobile,canReg=>{
		if(canReg){
			userDal.save(req.body,isOK=>{
				if(isOK){
					res.json({
						status:"y",
						msg:"注册成功"
					})
				}
				else{
					res.json({
						status:"n",
						msg:"未知错误"
					})
				}
			})
		}
		else{
			res.json({
				status:"n",
				msg:"手机号已经注册过"
			})
		}
	})
})
module.exports = router