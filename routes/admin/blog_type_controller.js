// 用来处理blog分类信息的页面关系
var express = require('express')
var router = express.Router()
// var db = require('../../common/db').dal_book_type //引入数据处理文件
var BlogTypeDal = require('../../common/blog_type').BlogTypeDal
var db = new BlogTypeDal()
// 列表数据
router.get('/list',(req,res)=>{
	// var searchName = ''
	var filter = {}
	if(req.query.name){
		var searchName = req.query.name
		filter.name = searchName
	}
	//取得已经存在的
	db.getData(filter,function(dataList){
		res.render('admin/blog_type/list',{list:dataList,query:req.query})
	})
})
// 新增页面
router.get('/add',(req,res)=>{
	res.render('admin/blog_type/add')
})
// 新增数据表单提交
router.post('/create',(req,res)=>{
	console.log(req.body)
	db.save(req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/blog_type/list') //页面跳转
		}
		else{
			//错误处理
		}
	})
})

router.post('/del',(req,res)=>{
	db.del(req.body.id,isOK=>{
		if(isOK){
			res.redirect('/admin/blog_type/list')
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
		res.render('admin/blog_type/edit',{model:model})
	})
})

router.post('/update/:id',(req,res)=>{
	var id = req.params.id
	db.updateByID(id,req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/blog_type/list')
		}
		else{
			//错误处理
		}
	})
})

module.exports = router
