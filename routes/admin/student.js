var express = require('express')
var router = express.Router()
var db = require('../../common/db') //引入数据处理文件
// 列表数据
router.get('/list',(req,res)=>{
	var searchName = ''	//页面中传递的查询条件 一般情况下查询建议使用get方式提交
	if(req.query.name){
		searchName = req.query.name
	}
	//取得已经存在的
	db.getData(searchName,function(dataList){
		// console.log(dataList)
		res.render('admin/student/list',{list:dataList,query:req.query})
	})
})
// 新增页面
router.get('/add',(req,res)=>{
	res.render('admin/student/add')
})
// 新增数据表单提交
router.post('/create',(req,res)=>{
	console.log(req.body)
	req.body.id = Date.now() ///为每一个model数据生成id,使用时间戳生成
	db.save(req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/student/list') //页面跳转
		}
		else{
			//错误处理
		}
	})
})

router.post('/del',(req,res)=>{
	console.log('-----执行删除操作-----')
	console.log(req.body)
	db.del(req.body.id,isOK=>{
		if(isOK){
			res.redirect('/admin/student/list')
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
		res.render('admin/student/edit',model)
	})
})

router.post('/update/:id',(req,res)=>{
	var id = req.params.id
	db.updateByID(id,req.body,function(isOK){
		if(isOK){
			res.redirect('/admin/student/list')
		}
		else{
			//错误处理
		}
	})
})

module.exports = router