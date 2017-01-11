// 用来处理书籍信息的页面关系
var express = require('express')
var router = express.Router()
var dalBook = require('../../common/db').dal_book
var dalBookType = require('../../common/db').dal_book_type

router.get('/list',(req,res)=>{
	var searchName = ""
	if(req.query.bookName){
		searchName = req.query.bookName //获取查询条件
	}
	dalBook.getData(searchName,data=>{
		// console.log(data[0].book_type)
		res.render('admin/book/list',{list:data,query:req.query})
	})
})

// 新增页面
router.get('/add',(req,res)=>{
	dalBookType.getData("",data=>{
		res.render('admin/book/add',{types:data})
	})
})
// 新增数据表单提交
router.post('/create',(req,res)=>{
	console.log(req.body)
	dalBook.save(req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/book/list') //页面跳转
		}
		else{
			//错误处理
		}
	})
})

router.post('/del',(req,res)=>{
	dalBook.del(req.body.id,isOK=>{
		if(isOK){
			res.redirect('/admin/book/list')
		}
		else{
			//错误处理
		}
	})
})

//修改指定的记录
router.get('/edit/:id',(req,res)=>{
	var id = req.params.id
	dalBookType.getData("",data=>{
		dalBook.findByID(id,function(model){
			//res.json(model)
			res.render('admin/book/edit',{model:model,types:data})
		})
	})
})

router.post('/update/:id',(req,res)=>{
	var id = req.params.id
	dalBook.updateByID(id,req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/book/list')
		}
		else{
			//错误处理
		}
	})
})

module.exports = router