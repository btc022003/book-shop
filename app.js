var express = require('express')
var bodyParser = require('body-parser')
var log = require('morgan')
var cookieParser = require('cookie-parser')

//全局加载tools模块
global.tools = require('./common/tools')
global.pageSize = 10 //分页显示的记录数量

var app = express()

app.use(log('dev')) //终端日志输出

app.use(cookieParser()) //使用cookie-parser中间件

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// art-template模版引擎配置
var template = require('art-template')
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


//配置静态资源目录
//如果存在多个同名的静态资源
//		那么在前面的文件夹中找到后就不会继续查找
//		遵循路由的从上往下匹配原则
app.use(express.static('./public'))

//定义管理后台的可以登录的用户信息
const adminUserData = [
	{userName:'admin',pwd:"admin"},
	{userName:'admin001',pwd:"123456"},
]
app.post('/admin/login',(req,res)=>{
	var userName = req.body.userName
	var userPWD = req.body.userPWD

	//根据用户名查询用户数据
	var user = adminUserData.find(item=>{
		return item.userName == userName
	})
	if(user){
		if(user.pwd == userPWD){
			res.cookie('adminUserName',userName,{path:'/'}) //设置管理后台中登陆用户的cookie信息
			res.json({
				status:'y',
				msg:'登录成功'
			})
		}
		else{
			res.json({
				status:'n',
				msg:'用户密码错误!'
			})
		}
	}
	else{
		res.json({
			status:'n',
			msg:'用户信息不存在!'
		})
	}
})
//所有的路由地址中包含/admin的都需要进行登录判断
app.all('/admin/*',(req,res,next)=>{
	console.log('当前访问的是管理后台,需要登录')
	console.log(req.cookies)
	//判断用户是否登录
	if(req.cookies.adminUserName){
		//此处可以继续用户合法性的判断...
		next()
	}
	else{
		res.redirect('/admin/login.html')
	}
	// next()
})
//渲染管理后台首页
app.get('/admin/main',(req,res)=>{
	res.render('admin/main')
})

app.use('/admin/book',require('./routes/admin/book_controller'))
app.use('/admin/book_type',require('./routes/admin/book_type_controller'))
app.use('/admin/users',require('./routes/admin/users_controller'))

//引入前台用户部分
app.use('/',require('./routes/users'))
app.use('/books',require('./routes/books'))

// 允许api控制器部分代码调用的时候可以进行跨域访问
app.all('/api/*',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*")
	next()
})
app.use('/api/v1/books',require('./routes/api/v1/books'))

app.listen('3000',()=>{
	console.log('服务器运行于3000端口...')
})