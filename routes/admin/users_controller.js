//此处为管理后台的用户部分路由
// 用来处理书籍分类信息的页面关系
var express = require('express')
var router = express.Router()
var UserDal = require('../../common/user').UserDal
var db = new UserDal()
// 列表数据
router.get('/list/:page?',(req,res)=>{
	var filter = {}
	//var searchName = ""
	if(req.query.name){
		var searchName = req.query.name //获取查询条件
		filter.name = new RegExp(searchName,"i")
	}

	var page = 1 //当前显示第几页的数据
	if(req.params.page){
		page = Number(req.params.page)
	}

	db.getDataByPage(page,filter,data=>{
		// console.log(data)
		var arrPages = global.tools.getPagesArr(page,data.pageCount) //生成分页页码数组
		res.render('admin/users/list',{
			list:data.res,
			pages:arrPages, //页面中显示的分页页码
			pageCount:data.pageCount, //总页数
			pageIndex:page, //当前页码
			query:req.query
		})
	})
})
// 新增页面
router.get('/add',(req,res)=>{
	res.render('admin/users/add')
})
// 新增数据表单提交
router.post('/create',(req,res)=>{
	console.log(req.body)
	db.save(req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/users/list') //页面跳转
		}
		else{
			//错误处理
		}
	})
})

router.post('/del',(req,res)=>{
	db.del(req.body.id,isOK=>{
		if(isOK){
			res.redirect('/admin/users/list')
		}
		else{
			//错误处理
		}
	})
})

//修改指定的记录
router.get('/edit/:id',(req,res)=>{
	var id = req.params.id
	db.findByID(id,function(model){
		//res.json(model)
		res.render('admin/users/edit',{model:model})
	})
})

router.post('/update/:id',(req,res)=>{
	var id = req.params.id
	db.updateByID(id,req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/users/list')
		}
		else{
			//错误处理
		}
	})
})

module.exports = router