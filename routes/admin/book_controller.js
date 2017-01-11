// 用来处理书籍信息的页面关系
var express = require('express')
var router = express.Router()
var dalBook = require('../../common/db').dal_book

router.get('/list',(req,res)=>{
	var searchName = ""
	if(req.query.bookName){
		searchName = req.query.bookName //获取查询条件
	}
	dalBook.getData(searchName,data=>{
		res.render('admin/book/list',{list:data,query:req.query})
	})
})

module.exports = router