// 用来处理书籍分类信息的页面关系
var express = require('express')
var router = express.Router()
var db = require('../../common/db').dal_book_type //引入数据处理文件
// 列表数据
router.get('/list',(req,res)=>{
	var searchName = ''
	if(req.query.name){
		searchName = req.query.name
	}
	//取得已经存在的
	db.getData(searchName,function(dataList){
		res.render('admin/book_type/list',{list:dataList,query:req.query})
	})
})
// 新增页面
router.get('/add',(req,res)=>{
	res.render('admin/book_type/add')
})
// 新增数据表单提交
router.post('/create',(req,res)=>{
	console.log(req.body)
	db.save(req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/book_type/list') //页面跳转
		}
		else{
			//错误处理
		}
	})
})

router.post('/del',(req,res)=>{
	db.del(req.body.id,isOK=>{
		if(isOK){
			res.redirect('/admin/book_type/list')
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
		res.render('admin/book_type/edit',{model:model})
	})
})

router.post('/update/:id',(req,res)=>{
	var id = req.params.id
	db.updateByID(id,req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/book_type/list')
		}
		else{
			//错误处理
		}
	})
})

module.exports = router