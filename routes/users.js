// 前台页面用户部分的路由...
var express = require('express')
var router = express.Router()
var UserDal = require('../common/user').UserDal
var userDal = new UserDal()

//注册页面
router.get('/reg',(req,res)=>{
	res.render('users/reg')
})
router.post('/reg',(req,res)=>{
	userDal.validateMobileCanReg(req.body.mobile,canReg=>{
		if(canReg){
			userDal.save(req.body,isOK=>{
				if(isOK){
					res.cookie('userid',data.user.id,{path:'/'})//登录成功后写cookie
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

//登录页面
router.get('/login',(req,res)=>{
	res.render('users/login')
})
router.post('/login',(req,res)=>{
	userDal.userLogin(req.body.mobile,data=>{
		if(data.isOK){
			if(req.body.pwd == data.user.pwd){
				res.cookie('userid',data.user.id,{path:'/'})//登录成功后写cookie
				res.json({
					status:"y",
					msg:"登录成功"
				})
			}
			else{
				res.json({
					status:"n",
					msg:"用户密码错误"
				})
			}
		}
		else{
			res.json({
				status:"n",
				msg:"用户信息不存在"
			})
		}
	})
})

//通过路由中传递next实现全线判断
router.get('/usercenter',(req,res,next)=>{
		if(req.cookies.userid){
			userDal.findByID(req.cookies.userid,user=>{
				if(user){
					// 把参数封装在req中进行传递
					req.user = user
					next()
				}
				else{
					res.redirect('/login')
				}
			})
		}else{
			res.redirect('/login')
		}
	},(req,res)=>{
		console.log('继续渲染')
		console.log(req.user)
		res.render('users/userinfo',{user:req.user})
})
module.exports = router